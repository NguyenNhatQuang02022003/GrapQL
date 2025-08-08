import { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  resetPassword,
  changePassword,
  sendResetEmail,
  promoteToAdmin,
  demoteAdmin,
  getAdmins
} from '../types/authen';

export const userResolvers = {
  Query: {
    users: async () => await getAllUsers(),
    user: async (_: any, { id }: { id: string }) => await getUserById(id),
    adminAccounts: async () => await getAdmins(),
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => await createUser(input),
    updateUser: async (_: any, { id, input }: { id: string; input: any }, context: any) =>
      await updateUser(id, input, context.user),
    deleteUser: async (_: any, { id }: { id: string }, context: any) => 
      await deleteUser(id, context.user),
    login: async (_: any, { email, password }: { email: string; password: string }) =>
      await loginUser(email, password),
    resetPassword: async (_: any, { email, newPassword }: { email: string; newPassword: string }) =>
      await resetPassword(email, newPassword),
    changePassword: async (_: any, { email, oldPassword, newPassword }: { 
      email: string; 
      oldPassword: string; 
      newPassword: string 
    }) => await changePassword(email, oldPassword, newPassword),
    sendResetEmail: async (_: any, { email }: { email: string }) => await sendResetEmail(email),
    promoteToAdmin: async (_: any, { userId }: { userId: string }, context: any) => {
      if (!context.user) throw new Error('Unauthorized');
      return await promoteToAdmin(context.user.userId, userId);
    },
    demoteAdmin: async (_: any, { userId }: { userId: string }, context: any) => {
      if (!context.user) throw new Error('Unauthorized');
      return await demoteAdmin(context.user.userId, userId);
    },
  },
};