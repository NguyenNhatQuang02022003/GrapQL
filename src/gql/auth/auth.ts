import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
};

export const requireSuperadmin = (user: any) => {
  if (!user || user.role !== 'superadmin') {
    throw new Error('Unauthorized: Superadmin privileges required');
  }
};

export const requireAdmin = (user: any) => {
  if (!user || !['admin', 'superadmin'].includes(user.role)) {
    throw new Error('Unauthorized: Admin privileges required');
  }
};