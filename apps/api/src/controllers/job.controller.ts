import prisma from '@/prisma';
import { Request, Response } from 'express';
import {
  CountryCode,
  JobCategory,
  JobEducationLevel,
  JobExperience,
  JobType,
  Prisma,
} from '@prisma/client';

export class JobController {
  async createJob(req: Request, res: Response) {
    try {
      const {
        job_title,
        description,
        location,
        country,
        salary,
        jobType,
        jobCategory,
        jobEducationLevel,
        jobExperience,
        companyId,
        is_active,
      } = req.body;
      
      const userId = req.user?.user_id;

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
        jobType,
        jobCategory,
        jobExperience,
        jobEducationLevel,
        salary: salary ? parseFloat(salary) : null,
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
      const {
        search,
        jobType,
        salary,
        jobCategory,
        jobEducationLevel,
        jobExperience,
        country,
        location,
        dateRange,
      } = req.query;

      const filter: Prisma.JobWhereInput = { is_active: true };

      // Search filter
      if (typeof search === 'string') {
        const lowerSearch = search.toLowerCase();
        filter.OR = [
          { job_title: { contains: lowerSearch } },
          { location: { contains: lowerSearch } },
          { company: { company_name: { contains: lowerSearch } } },
        ];
      }
      // Country filter
      if (country) filter.country = country as CountryCode;
      if (location) filter.location = { contains: location as string };

      // Job Type filter
      if (jobType) {
        const jobTypeArray = Array.isArray(jobType) ? jobType : [jobType];
        filter.jobType = { in: jobTypeArray as JobType[] };
      }

      // Job Category filter
      if (jobCategory) {
        const jobCategoryArray = Array.isArray(jobCategory) ? jobCategory : [jobCategory];
        filter.jobCategory = { in: jobCategoryArray as JobCategory[] };
      }

      // Job Education Level filter
      if (jobEducationLevel) {
        const jobEducationLevelArray = Array.isArray(jobEducationLevel) ? jobEducationLevel : [jobEducationLevel];
        filter.jobEducationLevel = { in: jobEducationLevelArray as JobEducationLevel[] };
      }

      // Job Experience filter
      if (jobExperience) {
        const jobExperienceArray = Array.isArray(jobExperience) ? jobExperience : [jobExperience];
        filter.jobExperience = { in: jobExperienceArray as JobExperience[] };
      }

      // Salary filter
      if (salary) {
        const salaryArray = Array.isArray(salary) ? salary : [salary];
        filter.salary = {
          OR: salaryArray.map((range) => {
            if (typeof range === 'string') {
              if (range === '5000') return { gte: 5000 };
              const [minSalary, maxSalary] = range.split('-').map(Number);
              return { gte: minSalary, ...(maxSalary ? { lte: maxSalary } : {}) };
            }
            return {};
          }),
        } as Prisma.IntFilter;
      }

      // Order jobs by date
      const orderBy = {
        created_at: dateRange === 'latest' ? 'desc' : 'asc',
      } as Prisma.JobOrderByWithRelationInput;

      // Fetch jobs with filters and ordering
      const jobs = await prisma.job.findMany({
        where: filter,
        include: { company: true },
        orderBy,
      });

      res.status(200).json({ status: 'ok', jobs });
    } catch (error) {
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
            include: {
              jobs: { where: { job_id: { not: Number(id) } } }
            }
          }
        }
      });
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      res.status(200).json({ job });
    } catch (err) {
      res.status(500).json({
        msg: 'An error occurred while fetching the job information'
      });
    }
  }

  async getJobsByCompanyId(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
  
      if (!companyId || isNaN(Number(companyId))) {
        return res.status(400).json({ msg: 'Invalid company ID' });
      }
  
      const jobs = await prisma.job.findMany({
        where: { company_id: Number(companyId), is_active: true },
        include: { company: true },
      });
  
      res.status(200).json({ status: 'ok', jobs });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to fetch jobs by company ID' });
    }
  }
  
  async updateJob(req: Request, res: Response) {
    try {
      const {
        job_title,
        description,
        location,
        country,
        salary,
        jobCategory,
        jobEducationLevel,
        jobExperience,
        is_active,
      } = req.body;
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
          jobCategory,
          jobEducationLevel,
          jobExperience,
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

  async getAppliedJobCount(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
      }

      const count = await prisma.application.count({
        where: { user_id: userId },
      });

      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching applied job count:', error);
      res.status(500).json({ msg: 'Failed to fetch applied job count' });
    }
  }

  async getFavoriteJobCount(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
      }

      const count = await prisma.favorite.count({
        where: { user_id: userId },
      });

      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching favorite job count:', error);
      res.status(500).json({ msg: 'Failed to fetch favorite job count' });
    }
  }

  async toggleSaveJob(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      const { jobId } = req.body;

      if (!userId || !jobId) {
        return res.status(400).json({ msg: 'User ID and Job ID are required' });
      }

      // Check if job is already saved
      const existingFavorite = await prisma.favorite.findFirst({
        where: { user_id: userId, job_id: jobId },
      });

      if (existingFavorite) {
        // Remove from favorites if already saved
        await prisma.favorite.delete({
          where: { id: existingFavorite.id },
        });
        res.status(200).json({ msg: 'Job removed from favorites' });
      } else {
        // Save job if not already saved
        await prisma.favorite.create({
          data: {
            user_id: userId,
            job_id: jobId,
          },
        });
        res.status(200).json({ msg: 'Job saved to favorites' });
      }
    } catch (error) {
      console.error('Error toggling favorite job:', error);
      res.status(500).json({ msg: 'Failed to save job' });
    }
  }

  async getFavoriteJobs(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      console.log('User ID in getFavoriteJobs:', userId);
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
  
      console.log('Favorites found:', favorites); // Log the retrieved favorites
  
      res.status(200).json({
        status: 'ok',
        favorites,
      });
    } catch (error) {
      console.error('Error fetching favorite jobs:', error);
      res.status(500).json({ msg: 'Failed to fetch favorite jobs' });
    }
  }
  

}
