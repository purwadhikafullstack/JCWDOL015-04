import { DashboardController } from '@/controllers/subscript.controller';
import { checkDeveloperRole } from '@/middlewares/checkRole';
import { verifyToken } from '@/middlewares/token';
import { Router } from 'express';


export class SubscriptionDashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.dashboardController = new DashboardController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/dashboard', verifyToken, checkDeveloperRole, this.dashboardController.getDashboardData);
    this.router.get('/check-active', verifyToken,  this.dashboardController.checkActiveSubscription);
    
  }

  getRouter(): Router {
    return this.router;
  }
}
