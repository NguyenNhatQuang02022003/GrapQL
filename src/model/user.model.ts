import prisma from '../prisma-client';

const allowedRoles = ['user', 'admin'];

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

  return await prisma.user.create({
    data: {
      name: input.name,
      dob: new Date(input.dob),
      email: input.email,
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
