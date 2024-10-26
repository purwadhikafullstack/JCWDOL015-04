import prisma from '@/prisma';
import { Request, Response } from 'express';
import { CountryCode, JobCategory, Prisma } from '@prisma/client';

export class JobController {
  async createJob(req: Request, res: Response) {
    try {
      const {
        job_title,
        description,
        location,
        country,
        salary,
        category,
        companyId,
        is_active,
      } = req.body;

      const userId = req.user?.user_id; // Assuming you have user information in `req.user`

      if (!job_title || !description || !companyId || !userId) {
        throw new Error(
          'Job title, description, company ID, and user ID are required',
        );
      }

      const jobData: Prisma.JobCreateInput = {
        job_title,
        description,
        location,
        country,
        salary: salary ? parseFloat(salary) : null,
        category,
        is_active: is_active === 'true',
        company: { connect: { company_id: parseInt(companyId, 10) } },
        User: { connect: { user_id: userId } },
      };

      const job = await prisma.job.create({
        data: jobData,
      });

      res.status(201).json({ job });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }

  async getJobs(req: Request, res: Response) {
    try {
      const { search, category, country, location, dateRange } = req.query;

      const filter: Prisma.JobWhereInput = {
        is_active: true,
      };

      if (search) {
        filter.OR = [
          { job_title: { contains: (search as string).toLowerCase() } },
          { location: { contains: (search as string).toLowerCase() } },
          {
            company: {
              company_name: {
                contains: (search as string).toLowerCase(),
              },
            },
          },
          {
            company: {
              IndustryType: {
                contains: (search as string).toLowerCase(),
              },
            },
          },
          {
            company: {
              address: {
                contains: (search as string).toLowerCase(),
              },
            },
          },
        ];
      }

      if (country) {
        filter.country = country as CountryCode;
      }

      if (location) {
        filter.location = { contains: (location as string).toLowerCase() };
      }

      if (category && Object.values(JobCategory).includes(category as JobCategory)) {
        filter.category = category as JobCategory;
      }

      const jobs = await prisma.job.findMany({
        where: filter,
        include: { company: true },
        orderBy: {
          created_at: dateRange === 'latest' ? 'desc' : 'asc',
        },
      });

      res.status(200).json({ status: 'ok', jobs });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch jobs' });
    }
  }

  async getJobById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ msg: 'Invalid job ID' });
      }

      const job = await prisma.job.findUnique({
        where: { job_id: Number(id) },
        include: {
          company: {
            include: { jobs: { where: { job_id: { not: Number(id) } } } },
          },
        },
      });

      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }

      res.status(200).json({ job });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }

  async updateJob(req: Request, res: Response) {
    try {
      const { job_title, description, location, country, salary, category, is_active } =
        req.body;
      const jobId = parseInt(req.params.jobId, 10);

      if (isNaN(jobId)) {
        return res
          .status(400)
          .json({ status: 'error', msg: 'Invalid job ID provided' });
      }

      const job = await prisma.job.findUnique({ where: { job_id: jobId } });
      if (!job) {
        return res.status(404).json({ status: 'error', msg: 'Job not found' });
      }

      const updatedJob = await prisma.job.update({
        where: { job_id: jobId },
        data: {
          job_title,
          description,
          location,
          country,
          salary: salary ? parseFloat(salary) : job.salary,
          category,
          is_active: is_active !== undefined ? is_active : job.is_active,
        },
      });

      res.status(200).json({
        status: 'ok',
        msg: 'Job information updated successfully!',
        job: updatedJob,
      });
    } catch (error) {
      console.error('Update Error:', error);
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred while updating job information',
      });
    }
  }
}
