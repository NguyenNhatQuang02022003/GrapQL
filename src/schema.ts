import { makeExecutableSchema } from '@graphql-tools/schema';
import { bookTypeDefs } from './schema/book.schema';
import { userTypeDefs } from './schema/authen.schema';
import { bookResolver } from './resolvers/book.resolver';
import { userResolvers } from './resolvers/authen.resolver';

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
