import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  user_id: number;
  assessment_id: number;
  role: string; // Pastikan role ditambahkan ke token
  iat: number;
  exp: number;
}

export const verifyAssessmentToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.SECRET_JWT!) as DecodedToken;

    // Simpan user_id, role, dan assessment_id ke req untuk digunakan di controller
    req.user = {
      user_id: decoded.user_id,
      role: decoded.role, // Tambahkan role ke req.user
    };
    req.assessment_id = decoded.assessment_id;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
