import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import dotenv from 'dotenv';
import prisma from './prisma-client';
import { getUserFromToken } from './utils/auth';

dotenv.config();
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP((req) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = token ? getUserFromToken(token) : null;
  return {
    schema,
    graphiql: true,
    context: { user },
  };
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server GraphQL chạy tại http://localhost:${PORT}/graphql`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
