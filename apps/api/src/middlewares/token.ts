import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type IUser = {
  user_id: number;
  role: string;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received in middleware:', token); // Log to check token

    if (!token) throw new Error('Token is missing');

    const verifiedToken = verify(token, process.env.SECRET_JWT!);

    req.user = verifiedToken as IUser;

    next();
  } catch (err) {
    console.error('Error:', err);
    res.status(400).send({
      status: 'error',
      msg: 'Invalid or expired token',
    });
  }
};