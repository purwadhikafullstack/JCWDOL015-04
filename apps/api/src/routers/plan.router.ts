import { Router } from 'express';
import { SubsController } from '@/controllers/plan.controller';
import { verifyToken } from '@/middlewares/token';
import { checkDeveloperRole } from '@/middlewares/checkRole';

export class SubsTypeRouter {
  private router: Router;
  private subsController: SubsController;

  constructor() {
    this.subsController = new SubsController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.subsController.getSubsType);
    this.router.get('/:id', this.subsController.getSubsTypeById);
    
    // Protected for Dev
    this.router.post('/create', verifyToken, checkDeveloperRole, this.subsController.createSubsType);
    this.router.put('/update/:id', verifyToken, checkDeveloperRole, this.subsController.updateSubsType);
    this.router.delete('/delete/:id', verifyToken, checkDeveloperRole,  this.subsController.deleteSubsType);
  }

  getRouter(): Router {
    return this.router;
  }
}
