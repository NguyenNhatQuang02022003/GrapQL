import { getAllUsers,  getUserById,  createUser,  updateUser,  deleteUser,  loginUser,  resetPassword, changePassword,} from '../model/authen.model';

export const userResolvers = {
  Query: {
    users: async () => await getAllUsers(),
    user: async (_: any, { id }: { id: string }) => await getUserById(id),
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => await createUser(input),
    updateUser: async (_: any, { id, input }: { id: string; input: any }) =>
      await updateUser(id, input),
    deleteUser: async (_: any, { id }: { id: string }) => await deleteUser(id),
    login: async (_: any, { email, password }: { email: string; password: string }) =>
      await loginUser(email, password),
    resetPassword: async (_: any, { email, newPassword }: { email: string; newPassword: string }) =>
      await resetPassword(email, newPassword),
    changePassword: async (  _: any,  {email, oldPassword, newPassword,}: { email: string; oldPassword: string; newPassword: string }) => 
      await changePassword(email, oldPassword, newPassword),
  },
};
