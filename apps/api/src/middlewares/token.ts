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

export const checkAdminDev = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'developer') throw new Error('Unauthorized');

    next();
  } catch (err) {
    res.status(400).send({
      status: 'error',
      msg: 'Unauthorized',
    });
  }
};

export const checkCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== 'Candidate') throw new Error('Unauthorized');

    next();
  } catch (err) {
    res.status(400).send({
      status: 'error',
      msg: 'Unauthorized',
    });
  }
};
