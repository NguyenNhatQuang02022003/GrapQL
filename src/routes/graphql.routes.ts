import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../model/schema';
import { getUserFromToken } from '../gql/auth/auth';
import expressPlayground from 'graphql-playground-middleware-express';

const router = Router();

router.post(
  '/',
  (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? getUserFromToken(token) : null;

    return graphqlHTTP({
      schema,
      context: { user },
    })(req, res);
  }
);

router.get('/', expressPlayground({ endpoint: '/graphql' }));

export const graphqlRoute = router;
