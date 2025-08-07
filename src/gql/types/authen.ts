import prisma from '../../config/prisma-client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../auth/email.service';

const allowedRoles = ['user', 'admin'];
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (input: any) => {
  const role = input.role || 'user';
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

export const updateUser = async (id: string, input: any) => {
  if (input.role && !allowedRoles.includes(input.role)) {
    throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
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

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
// 👇 Hàm đăng nhập người dùng
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

// 👇 Hàm đặt lại mật khẩu
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

  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default-secret', {
    expiresIn: '1h',
  });

  await sendResetPasswordEmail(email, token);
  return { message: 'Reset email sent' };
};
