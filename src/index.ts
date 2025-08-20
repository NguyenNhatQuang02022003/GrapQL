import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import prisma from './prisma-client';
import { createInitialAdmin } from './gql/types/authen';
import { createApolloGraphqlRoute } from './routes/graphql.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware cơ bản
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
app.use('/auth', authRoutes);

// khởi chạy server
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to database');

    await createInitialAdmin();

    // tạo route graphql
    const graphqlRoute = await createApolloGraphqlRoute();
    app.use('/graphql', graphqlRoute);

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
