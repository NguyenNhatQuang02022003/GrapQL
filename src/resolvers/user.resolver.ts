import {  getAllUsers,  getUserById,  createUser,  updateUser,  deleteUser} from '../model/user.model';

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
  },
};
