import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type IUser = {
  user_id: number;
  role: string;
  company_id?: number;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Token is missing');

    const verifiedToken = verify(token, process.env.SECRET_JWT!);

    req.user = verifiedToken as IUser;

    next();
  } catch (err) {
    res.status(400).send({
      status: 'error',
      msg: 'Invalid or expired token',
    });
  }
};