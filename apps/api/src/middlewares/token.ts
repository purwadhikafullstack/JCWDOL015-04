import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// Definisikan tipe untuk user
interface User {
  user_id: number;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Ambil token dari cookies atau header Authorization
    const token =
      req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.error('No token provided'); // Debug log
      throw new Error('Token is missing');
    }

    // Verifikasi token
    const verifiedToken = verify(token, process.env.SECRET_JWT!) as User;

    // Periksa apakah token memiliki properti user_id
    if (!verifiedToken.user_id) {
      console.error('Invalid token structure'); // Debug log
      throw new Error('Invalid token structure');
    }

    // Masukkan informasi pengguna ke req.user
    req.user = verifiedToken;

    console.log('Verified token:', verifiedToken); // Debugging log

    next(); // Lanjutkan ke middleware berikutnya
  } catch (err) {
    console.error('Token verification error:', err); // Log error
    res.status(400).send({
      status: 'error',
      msg: 'Invalid or expired token',
    });
  }
};


