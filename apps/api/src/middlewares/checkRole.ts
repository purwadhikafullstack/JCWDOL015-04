import { Request, Response, NextFunction } from 'express';

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: 'error',
        msg: 'User is not authenticated',
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: 'error',
        msg: `Access forbidden: ${allowedRoles.join('')} only`,
      });
    }

    next();
  };
};

export const checkAdminDev = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'developer')
      throw new Error('Unauthorized');

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
    if (req.user?.role !== 'candidate') throw new Error('Unauthorized');

    next();
  } catch (err) {
    res.status(400).send({
      status: 'error',
      msg: 'Unauthorized',
    });
  }
};
