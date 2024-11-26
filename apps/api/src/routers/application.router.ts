import { Router } from 'express';
import { ApplicationController } from '@/controllers/application.controller';
import { verifyToken } from '@/middlewares/token';
import { validateApplicationData } from '@/middlewares/validateApplicationData';
import { uploader } from '@/middlewares/uploader';
import { checkAdminDev, checkCandidate } from '@/middlewares/checkRole';

const resumeUploader = uploader('resume', 'resume');

export class ApplicationRouter {
  private router: Router;
  private applicationController: ApplicationController;

  constructor() {
    this.applicationController = new ApplicationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/apply',
      verifyToken,
      checkCandidate,
      resumeUploader.single('resume'),
      validateApplicationData,
      this.applicationController.createApplication
    );

    this.router.get(
      '/user/applications',
      verifyToken,
      checkCandidate,
      this.applicationController.getApplicationsByUser
    );

    this.router.get(
      '/:applicationId',
      verifyToken,
      checkCandidate,
      this.applicationController.getApplicationById
    );

    this.router.patch(
      '/:applicationId/status',
      verifyToken,
      checkAdminDev,
      this.applicationController.updateApplicationStatus
    );

    this.router.get('/user/:userId/recent', verifyToken, this.applicationController.getRecentlyAppliedJobs);
    this.router.get('/job/:jobId', this.applicationController.getApplicationsByJobId);
    this.router.get('/interview-applicants/:companyId', this.applicationController.getInterviewApplicantsByCompany);
    this.router.get('/interview-schedules/:companyId',this.applicationController.getInterviewSchedules);
    this.router.delete(
      '/interview-schedules/:scheduleId',
      this.applicationController.deleteInterviewSchedule,
    );
    
    this.router.patch('/:applicationId/interview-schedule', this.applicationController.updateInterviewSchedule);

  }

  getRouter(): Router {
    return this.router;
  }
}
