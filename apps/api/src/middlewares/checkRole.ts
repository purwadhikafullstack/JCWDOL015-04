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
          msg: `Access forbidden: ${allowedRoles.join(', ')} only`,
        });
      }
  
      next();
    };
  };
  