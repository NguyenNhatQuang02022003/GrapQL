import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import './gql/auth/auth.google';
import prisma from './prisma-client';
import { graphqlRoute } from './routes/graphql.routes';
import authRoutes from './routes/auth.routes';
import { createInitialAdmin } from './gql/types/authen';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlRoute);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;

prisma.$connect()
  .then(() => {
    console.log('✅ Connected to database');
    return createInitialAdmin();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});