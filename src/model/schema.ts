import { makeExecutableSchema } from '@graphql-tools/schema';
import { bookTypeDefs } from '../model/book.schema';
import { userTypeDefs } from '../model/authen.schema';
import { bookResolver } from '../gql/resolvers/book.resolver';
import { userResolvers } from '../gql/resolvers/authen.resolver';

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
