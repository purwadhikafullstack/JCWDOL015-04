import prisma from '@/prisma';
import { Request, Response } from 'express';

export class FavoriteJobController {
  async getFavoriteJobs(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
      }

      const favorites = await prisma.favorite.findMany({
        where: { user_id: userId },
        include: {
          job: {
            include: { company: true },
          },
        },
      });

      res.status(200).json({
        status: 'ok',
        favorites,
      });
    } catch (error) {
      console.error('Error fetching favorite jobs:', error);
      res.status(500).json({ msg: 'Failed to fetch favorite jobs' });
    }
  }

  async checkApplicationStatus(req: Request, res: Response) {
    try {
      const jobIdString = req.query.jobId as string;
      const jobId = parseInt(jobIdString, 10);
      const userId = req.user?.user_id;

      if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
      }
      if (!jobIdString || isNaN(jobId)) {
        return res.status(400).json({ msg: 'Invalid job ID' });
      }

      const existingApplication = await prisma.application.findFirst({
        where: { user_id: userId, job_id: jobId },
      });

      if (existingApplication) {
        return res.status(200).json({ applied: true });
      } else {
        return res.status(200).json({ applied: false });
      }
    } catch (error) {
      console.error('Error checking application status:', error);
      res.status(500).json({ msg: 'Failed to check application status' });
    }
  }
}
