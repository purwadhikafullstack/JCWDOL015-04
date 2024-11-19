import prisma from '@/prisma';
import {
  notifyApplicationStatusChange,
  sendNotification,
} from '@/services/notificationService';
import { Request, Response } from 'express';
import { ApplicationStatus, NotificationType } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/notmailer';

export const base_url = process.env.BASE_API_URL;
export const base_fe_url = process.env.BASE_FE_URL;

export class ApplicationController {
  async createApplication(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      const { jobId, coverLetter, expected_salary } = req.body;

      if (!userId || !jobId) {
        return res.status(400).json({ msg: 'User ID and Job ID are required' });
      }

      const jobIdInt = parseInt(jobId, 10);
      if (isNaN(jobIdInt)) {
        return res.status(400).json({ msg: 'Invalid Job ID' });
      }

      const resumePath = req.file
        ? `${base_url}/public/resumes/${req.file.filename}`
        : null;

      const existingApplication = await prisma.application.findFirst({
        where: {
          user_id: userId,
          job_id: jobIdInt,
        },
      });

      if (existingApplication) {
        return res
          .status(400)
          .json({ msg: 'You have already applied for this job.' });
      }

      // Fetch job and user details for the email content
      const job = await prisma.job.findUnique({
        where: { job_id: jobIdInt },
        include: { company: true },
      });
      const user = await prisma.user.findUnique({ where: { user_id: userId } });

      if (!job || !user) {
        return res.status(404).json({ msg: 'Job or user not found' });
      }

      // Create the application in the database
      const application = await prisma.application.create({
        data: {
          resume: resumePath,
          coverLetter,
          expected_salary: expected_salary ? parseFloat(expected_salary) : null,
          status: 'active',
          user: { connect: { user_id: userId } },
          job: { connect: { job_id: jobIdInt } },
        },
      });

      // Send application status notification within the app
      await sendNotification({
        userId,
        subject: 'Application Submitted',
        message:
          'Thank you! Your application has been received and is now under review.',
        type: NotificationType.application,
        relatedId: application.application_id,
        link: `/applications/${application.application_id}`,
      });

      // Send application confirmation email to the user
      const templatePath = path.join(
        __dirname,
        '../templates/applicationConfirmation.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);

      const emailHtml = compiledTemplate({
        name: `${user.first_name} ${user.last_name}`,
        jobTitle: job.job_title,
        companyName: job.company?.company_name || 'the company',
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: 'Your Job Application Submission',
        html: emailHtml,
      });

      res
        .status(201)
        .json({ msg: 'Application submitted successfully!', application });
    } catch (error) {
      console.error('Error applying for job:', error);
      res.status(500).json({ msg: 'Error creating application' });
    }
  }

  async getApplicationsByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (!userId) return res.status(400).json({ msg: 'Invalid User ID' });

      const applications = await prisma.application.findMany({
        where: { user_id: userId },
        include: { job: true },
      });

      res.status(200).json({ applications });
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ msg: 'Failed to fetch applications' });
    }
  }

  async getApplicationById(req: Request, res: Response) {
    try {
      const applicationId = parseInt(req.params.applicationId, 10);
      if (isNaN(applicationId))
        return res.status(400).json({ msg: 'Invalid application ID' });

      const application = await prisma.application.findUnique({
        where: { application_id: applicationId },
        include: { job: true },
      });

      if (!application)
        return res.status(404).json({ msg: 'Application not found' });

      res.status(200).json({ application });
    } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ msg: 'Failed to fetch application' });
    }
  }

  async updateApplicationStatus(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;
      const { status: newStatus } = req.body;

      if (!applicationId || !newStatus) {
        return res
          .status(400)
          .json({ msg: 'Application ID and new status are required' });
      }

      // Validate the new status
      if (
        !Object.values(ApplicationStatus).includes(
          newStatus as ApplicationStatus,
        )
      ) {
        return res.status(400).json({ msg: 'Invalid application status' });
      }

      // Retrieve the current status before updating
      const currentApplication = await prisma.application.findUnique({
        where: { application_id: Number(applicationId) },
      });

      if (!currentApplication) {
        return res.status(404).json({ msg: 'Application not found' });
      }

      const currentStatus = currentApplication.status;

      // Update the application status in the database
      const updatedApplication = await prisma.application.update({
        where: { application_id: Number(applicationId) },
        data: { status: newStatus },
      });

      // Notify the user about the status change
      await notifyApplicationStatusChange(
        updatedApplication.user_id,
        updatedApplication.application_id,
        currentStatus,
        newStatus,
      );

      res.status(200).json({
        msg: 'Application status updated successfully!',
        application: updatedApplication,
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      res.status(500).json({ msg: 'Error updating application status' });
    }
  }

  async getRecentlyAppliedJobs(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ msg: 'Invalid User ID' });
    }

    const applications = await prisma.application.findMany({
      where: { user_id: userId },
      orderBy: { applied_at: 'desc' },
      include: {
        job: { include: { company: true } },
      },
    });

    if (!applications) {
      return res.status(404).json({ msg: 'No applications found' });
    }
    res.status(200).json({
      applications: applications.map((app) => ({
        application_id: app.application_id,
        job_title: app.job?.job_title,
        company_name: app.job?.company?.company_name,
        logo: app.job?.company?.logo,
        location: app.job?.location,
        date_applied: app.applied_at,
        status: app.status,
      })),
    });
  }

  async getApplicationsByJobId(req: Request, res: Response) {
    const jobId = parseInt(req.params.jobId, 10); 
  
    try {
  
      if (isNaN(jobId)) {
        console.warn('Invalid Job ID:', jobId);
        return res.status(400).json({ msg: 'Invalid Job ID' });
      }
  
      const applications = await prisma.application.findMany({
        where: { job_id: jobId },
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              years_of_experience: true,
              education: true,
              profile_picture: true,
              email: true,
              phone: true,
            },
          },
          job: {
            select: {
              job_title: true,
            },
          },
        },
      });
  
      if (applications.length === 0) {
        console.warn(`Applications not found for job ID: ${jobId}`);
        return res.status(404).json({ msg: 'No applications found for this job' });
      }
  
      res.status(200).json({
        applications: applications.map((app) => ({
          id: app.application_id,
          name: `${app.user.first_name} ${app.user.last_name}`,
          position: app.job.job_title,
          email: app.user.email,
          phone: app.user.phone,
          experience: app.user.years_of_experience,
          education: app.user.education,
          dateApplied: app.applied_at,
          resume: app.resume,
          status: app.status,
          photoUrl: app.user.profile_picture,
        })),
      });
    } catch (error) {
      const err = error as Error; // Casting ke tipe Error
      console.error('Error fetching applications for Job ID:', jobId, err.message);
      res.status(500).json({ msg: 'Failed to fetch applications', error: err.message });
    }
  }
  

  async getInterviewApplicantsByCompany(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.companyId, 10);

      if (isNaN(companyId)) {
        return res.status(400).json({ msg: 'Invalid Company ID' });
      }

      const interviewApplicants = await prisma.application.findMany({
        where: {
          job: {
            company_id: companyId,
          },
          status: 'interview',
        },
        include: {
          user: {
            select: {
              user_id: true,
              first_name: true,
              last_name: true,
              years_of_experience: true,
              education: true,
              profile_picture: true,
            },
          },
          job: {
            select: {
              job_id: true,
              job_title: true,
            },
          },
        },
      });

      if (interviewApplicants.length === 0) {
        return res.status(404).json({ msg: 'No interview applicants found for this company' });
      }

      res.status(200).json({
        applicants: interviewApplicants.map((app) => ({
          id: app.user.user_id,
          name: `${app.user.first_name} ${app.user.last_name}`,
          position: app.job.job_title,
          experience: app.user.years_of_experience,
          education: app.user.education,
          photoUrl: app.user.profile_picture,
        })),
      });
    } catch (error) {
      console.error('Error fetching interview applicants by company:', error);
      res.status(500).json({ msg: 'Failed to fetch interview applicants by company' });
    }
  }

  async updateInterviewSchedule(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;
      const { interviewDate, interviewTime } = req.body;

  
      if (!applicationId || !interviewDate || !interviewTime) {
        return res
          .status(400)
          .json({ msg: 'Application ID, interview date, and time are required' });
      }
  
      const updatedApplication = await prisma.application.update({
        where: { application_id: Number(applicationId) },
        data: {
          interview_date: new Date(interviewDate),
          interview_time: interviewTime,
          status: 'interview',
        },
      });
  
      res.status(200).json({
        msg: 'Interview schedule updated successfully!',
        application: updatedApplication,
      });
    } catch (error) {
      console.error('Error updating interview schedule:', error);
      res.status(500).json({ msg: 'Failed to update interview schedule', error });
    }
  }
  
  
  
  
}
