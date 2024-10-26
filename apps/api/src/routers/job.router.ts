import { JobController } from '@/controllers/job.controller';
import { checkAdminDev, verifyToken } from '@/middlewares/token';
import { Router } from 'express';

export class JobRouter {
  private router: Router;
  private jobController: JobController;

  constructor() {
    this.jobController = new JobController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.jobController.getJobs);
    this.router.post('/jobs', this.jobController.createJob);
    this.router.get('/jobs/:jobId', this.jobController.getJobById);
    this.router.put('/jobs/:jobId', this.jobController.updateJob);
  }

  getRouter(): Router {
    return this.router;
  }
}
