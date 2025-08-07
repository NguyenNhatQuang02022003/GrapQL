import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './model/schema';
import dotenv from 'dotenv';
import prisma from './config/prisma-client';
import { getUserFromToken } from './gql/auth/auth';
import session from 'express-session';
import passport from 'passport';
import './gql/auth/auth.google';
import { generateToken } from './gql/auth/auth.google';

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

app.use('/graphql', graphqlHTTP((req) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = token ? getUserFromToken(token) : null;
  return {
    schema,
    graphiql: true,
    context: { user },
  };
}));

app.get('/auth/google',  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req: any, res) => {
    const token = generateToken(req.user);
    res.send({ message: 'Google login successful', token });
  }
);


app.get('/auth/failure', (req, res) => {
  res.send('Google login failed');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server GraphQL chạy tại http://localhost:${PORT}/graphql`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
