import { makeExecutableSchema } from '@graphql-tools/schema';
import { bookTypeDefs } from './schema/book.schema';
import { userTypeDefs } from './schema/user.schema';
import { bookResolver } from './resolvers/book.resolver';
import { userResolvers } from './resolvers/user.resolver';

const typeDefs = [bookTypeDefs, userTypeDefs];

const resolvers = {
  Query: {
    ...bookResolver.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...bookResolver.Mutation,
    ...userResolvers.Mutation,
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
