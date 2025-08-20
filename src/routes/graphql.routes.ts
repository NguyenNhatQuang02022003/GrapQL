import { Router } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import bodyParser from 'body-parser';

import { schema } from '../model/schema';
import { getUserFromToken } from '../gql/auth/auth';

export async function createApolloGraphqlRoute() {
  const router = Router();

  const server = new ApolloServer({
    schema,
  });
  await server.start();

  router.use(
    '/',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = token ? getUserFromToken(token) : null;
        return { user };
      },
    })
  );

  return router;
}
