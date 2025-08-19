import prisma from '../../prisma-client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../auth/email.service';
import { UserRole } from '@prisma/client';
import { requireSuperadmin } from '../../gql/auth/auth';

const allowedRoles: UserRole[] = [UserRole.user, UserRole.admin, UserRole.superadmin];
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'superadmin@example.com';
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD || 'securepassword';

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: {
      NOT: { role: UserRole.superadmin },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAdmins = async () => {
  return await prisma.user.findMany({
    where: {
      OR: [
        { role: UserRole.admin },
        { role: UserRole.superadmin }
      ]
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const createInitialAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.superadmin }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(SUPERADMIN_PASSWORD, 10);
      await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: SUPERADMIN_EMAIL,
          password: hashedPassword,
          role: UserRole.superadmin,
          dob: new Date('1990-01-01')
        },
      });
      console.log('✅ Superadmin account created');
    }
  } catch (error) {
    console.error('Failed to create superadmin:', error);
  }
};

export const createUser = async (input: any, contextUser?: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  let role: UserRole = input.role || UserRole.user;

  if (input.email === SUPERADMIN_EMAIL) {
    role = UserRole.superadmin;
  }

  if (role === UserRole.admin && contextUser?.role !== UserRole.superadmin) {
    throw new Error('Only superadmin can create admin accounts');
  }

  if (role === UserRole.superadmin) {
    const existingSuperadmin = await prisma.user.findFirst({
      where: { role: UserRole.superadmin }
    });

    if (existingSuperadmin) {
      throw new Error('Superadmin already exists');
    }
  }

  if (!allowedRoles.includes(role)) {
    throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  return await prisma.user.create({
    data: {
      name: input.name,
      dob: new Date(input.dob),
      email: input.email,
      password: hashedPassword,
      role,
    },
  });
};

export const promoteToAdmin = async (adminId: string, userId: string) => {
  const admin = await prisma.user.findUnique({ where: { id: adminId } });
  requireSuperadmin(admin);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  if (user.role === UserRole.admin) throw new Error('User is already an admin');
  if (user.role === UserRole.superadmin) throw new Error('Cannot modify superadmin role');

  return await prisma.user.update({
    where: { id: userId },
    data: { role: UserRole.admin }
  });
};

export const demoteAdmin = async (adminId: string, userId: string) => {
  const admin = await prisma.user.findUnique({ where: { id: adminId } });
  requireSuperadmin(admin);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  if (user.role !== UserRole.admin) throw new Error('User is not an admin');

  return await prisma.user.update({
    where: { id: userId },
    data: { role: UserRole.user }
  });
};

export const updateUser = async (id: string, input: any, contextUser?: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  if (input.email && input.email !== user.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
    if (existingUser) throw new Error('Email already exists');
  }

  if (input.role) {
    if (!allowedRoles.includes(input.role)) {
      throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
    }

    // Nếu email trùng SUPERADMIN_EMAIL => gán superadmin
    if (input.email === SUPERADMIN_EMAIL) {
      input.role = UserRole.superadmin;
    }

    if (input.role === UserRole.superadmin && contextUser?.role !== UserRole.superadmin) {
      throw new Error('Only superadmin can update user roles');
    }
  }

  return await prisma.user.update({
    where: { id },
    data: {
      name: input.name,
      dob: new Date(input.dob),
      email: input.email,
      role: input.role,
    },
  });
};

export const deleteUser = async (id: string, contextUser?: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  if (user.role === UserRole.superadmin) {
    throw new Error('Cannot delete superadmin');
  }

  if (user.role === UserRole.admin && contextUser?.role !== UserRole.superadmin) {
    throw new Error('Only superadmin can delete admin accounts');
  }

  return await prisma.user.delete({ where: { id } });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const resetPassword = async (email: string, newPassword: string) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: { email },
    data: { password: hashed },
  });
};

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Old password is incorrect');

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  });
};

export const sendResetEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  await sendResetPasswordEmail(email, token);
  return { message: 'Reset email sent' };
};
