import { JobController } from '@/controllers/job.controller';
import { verifyToken } from '@/middlewares/token';
import { checkAdminDev, checkRole, checkCandidate} from '@/middlewares/checkRole';
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
    this.router.get('/:id', this.jobController.getJobById);
    
    //Protected for AdminDev
    this.router.post('/', verifyToken, checkAdminDev, this.jobController.createJob);
    this.router.put('/:id',verifyToken,checkAdminDev ,this.jobController.updateJob);
    this.router.get('/applied/count', verifyToken, checkCandidate, this.jobController.getAppliedJobCount);
    this.router.get('/favorites/count', verifyToken, checkCandidate, this.jobController.getFavoriteJobCount);
    this.router.post('/favorites/toggle', verifyToken, checkCandidate, this.jobController.toggleSaveJob);
  }

  getRouter(): Router {
    return this.router;
  }
}
