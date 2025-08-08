// src/index.ts
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import './gql/auth/auth.google';
import prisma from './schema/prisma-client';
import { graphqlRoute } from './routes/graphql.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();
const app = express();

app.use(cors());

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlRoute);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server GraphQL chạy tại http://localhost:${PORT}/graphql`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
