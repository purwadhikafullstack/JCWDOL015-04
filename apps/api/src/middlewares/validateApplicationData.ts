import { Request, Response, NextFunction } from 'express';

export function validateApplicationData(req: Request, res: Response, next: NextFunction) {
  const { jobId, expected_salary } = req.body;

  if (!jobId) {
    return res.status(400).json({ msg: 'Job ID is required' });
  }

  if (expected_salary && isNaN(parseFloat(expected_salary))) {
    return res.status(400).json({ msg: 'Expected salary must be a valid number' });
  }

  next();
}