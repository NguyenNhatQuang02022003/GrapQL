import { Router, Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../gql/auth/auth.google';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req: Request, res: Response) => {
    const token = generateToken(req.user);
    res.send({ message: 'Google login successful', token });
  }
);

router.get('/failure', (_req: Request, res: Response) => {
  res.send('Google login failed');
});

export default router;
