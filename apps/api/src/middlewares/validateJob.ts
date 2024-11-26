import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateJob = [
  body('job_title').notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('country').isString().isLength({ min: 2, max: 2 }).withMessage('Country code must be 2 characters'),
  body('location').notEmpty().withMessage('Location is required'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('jobType').isIn(['fullTime', 'partTime', 'freelance', 'contractor']).withMessage('Invalid job type'),
  body('jobCategory').notEmpty().withMessage('Job category is required'),
  body('jobEducationLevel').optional().isString().withMessage('Invalid education level'),
  body('jobExperience').optional().isString().withMessage('Invalid job experience'),
  body('jobExpired_at').optional().isISO8601().toDate().withMessage('Invalid date format for job expiration'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }
  next();
};
