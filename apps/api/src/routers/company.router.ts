import { CompanyController } from '@/controllers/company.controller';
import { verifyToken } from '@/middlewares/token';
import { logoBannerUploader } from '@/middlewares/logoBannerUploader';
import { Router } from 'express';
import { checkAdminDev } from '@/middlewares/checkRole';


export class CompanyRouter {
  private router: Router;
  private companyController: CompanyController;

  constructor() {
    this.companyController = new CompanyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Protected routes (need verifyToken to set req.user)
    this.router.post(
      '/',
      verifyToken,
      logoBannerUploader,
      this.companyController.createCompany.bind(this.companyController)
    );  
  
    this.router.put(
      '/:id',
      logoBannerUploader,
      this.companyController.updateCompany.bind(this.companyController)
    );
  
    // Define more specific routes before general routes to prevent conflicts
    this.router.get('/search', verifyToken, this.companyController.getCompanies.bind(this.companyController));
    this.router.get('/user', verifyToken, this.companyController.getUserCompany.bind(this.companyController));
    this.router.get('/:id', this.companyController.getCompanyById.bind(this.companyController));
    
    // General route for fetching all companies should come last
    this.router.get('/', this.companyController.getAllCompanies.bind(this.companyController));
  
    this.router.delete('/:id', verifyToken, checkAdminDev, this.companyController.deleteCompany.bind(this.companyController));
  }

  getRouter(): Router {
    return this.router;
  }
}
