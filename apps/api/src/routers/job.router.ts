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
    this.router.post('/', this.jobController.createJob);
    this.router.get('/', this.jobController.getJobs);
    this.router.get('/:id', this.jobController.getJobById);
    this.router.put('/:id', this.jobController.updateJob);
  }

  getRouter(): Router {
    return this.router;
  }
}
