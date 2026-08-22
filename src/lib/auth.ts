import jwt from 'jsonwebtoken';
import { User, UserRole } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'vidhyavani_gujarati_secure_jwt_secret_2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export function generateToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getRoleHomeRoute(role: UserRole): string {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/sanchalak';
    case 'teacher':
      return '/shikshak';
    case 'student':
    default:
      return '/vidyarthi';
  }
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'super_admin':
      return 'મુખ્ય સંચાલક';
    case 'admin':
      return 'સંચાલક';
    case 'teacher':
      return 'શિક્ષક';
    case 'student':
      return 'વિદ્યાર્થી';
    default:
      return 'વપરાશકર્તા';
  }
}
