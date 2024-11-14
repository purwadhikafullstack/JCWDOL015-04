import { Router } from 'express';
import { verifyToken } from '@/middlewares/token';
import { checkDeveloperRole } from '@/middlewares/checkRole';
import { SubscriptionController } from '@/controllers/subscript.controller';

export class SubscriptionRouter {
  private router: Router;
  private subscriptionController: SubscriptionController;

  constructor() {
    this.subscriptionController = new SubscriptionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.subscriptionController.getSubscriptionStatus);
    this.router.get('/:id', this.subscriptionController.getSubscriptionById);
    this.router.post('/create', verifyToken, checkDeveloperRole, this.subscriptionController.createSubscription);
    this.router.put('/update/:id', verifyToken, checkDeveloperRole, this.subscriptionController.updateSubscription);
    this.router.delete('/delete/:id', verifyToken, checkDeveloperRole, this.subscriptionController.deleteSubscription);
  }

  getRouter(): Router {
    return this.router;
  }
}
