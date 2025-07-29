import { User, IUser } from "../model/user.model";

export const userResolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_: any, args: { id: string }) => await User.findById(args.id),
  },

  Mutation: {
    createUser: async (_: any, args: { input: any }) => {
      const { input } = args;

      const userData = {
        ...input,
        role: input.role || 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newUser = new User(userData);
      return await newUser.save();
    },

    updateUser: async (_: any, args: { id: string, input: any }) => {
      const updated = await User.findByIdAndUpdate(
        args.id,
        {
          ...args.input,
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );
      return updated;
    },

    deleteUser: async (_: any, args: { id: string }) => {
      return await User.findByIdAndDelete(args.id);
    },
  },
};
