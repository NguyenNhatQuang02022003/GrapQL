import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../../config/prisma-client';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value;
      if (!email) return done(new Error("No email found in Google profile"), false);

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return done(null, existingUser as any); // ép kiểu nếu cần
      }

      const newUser = await prisma.user.create({
        data: {
          name: profile.displayName,
          email,
          dob: new Date(),
          password: '',
          role: 'user',
        },
      });

      return done(null, newUser as any);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export const generateToken = (user: any) => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};
