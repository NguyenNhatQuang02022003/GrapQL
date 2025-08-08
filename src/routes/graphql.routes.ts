import { RequestHandler } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../model/schema';
import { getUserFromToken } from '../gql/auth/auth';

export const graphqlRoute: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = token ? getUserFromToken(token) : null;

  return graphqlHTTP({
    schema,
    graphiql: true,
    context: { user },
  })(req, res);
};  