import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'wedding-secret-key-2026';

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
