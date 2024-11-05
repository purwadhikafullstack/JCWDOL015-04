import { CompanyController } from '@/controllers/company.controller';
import { verifyToken } from '@/middlewares/token';
import { uploader } from '@/middlewares/uploader';
import { Router } from 'express';

const logoUploader = uploader('logo', 'logo');
const bannerUploader = uploader('banner', 'banner');

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
    this.router.post('/', verifyToken, logoUploader.single('logo'), bannerUploader.single('banner'), this.companyController.createCompany.bind(this.companyController));
    
    this.router.put('/:id', verifyToken, logoUploader.single('logo'), bannerUploader.single('banner'), this.companyController.updateCompany.bind(this.companyController));
    
    this.router.get('/', this.companyController.getAllCompanies.bind(this.companyController));
    this.router.get('/:id', this.companyController.getCompanyById.bind(this.companyController));
    
    this.router.delete('/:id', verifyToken, this.companyController.deleteCompany.bind(this.companyController));
  }

  getRouter(): Router {
    return this.router;
  }
}
