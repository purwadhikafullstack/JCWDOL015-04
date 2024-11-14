import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Token is missing');

    const verifiedToken = verify(token, process.env.SECRET_JWT!);

    // Isi user ke dalam req.user
    req.user = verifiedToken as User;

    next();
  } catch (err) {
    console.error('Error:', err);
    res.status(400).send({
      status: 'error',
      msg: 'Invalid or expired token',
    });
  }
};
