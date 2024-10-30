import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middlewares/token';
import { uploader } from '@/middlewares/uploader';
import { Router } from 'express';

const profilePictureUploader = uploader('profile', 'profile_picture');

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // // Protected routes (need verifyToken to set req.user)
    this.router.get('/', verifyToken, this.userController.getUser);
    this.router.get('/:id', this.userController.getUserId);
    this.router.put('/update', verifyToken, profilePictureUploader.single('profile_picture'), this.userController.updateUser);


    // public routes
    this.router.post('/', this.userController.createUser);
    this.router.post('/login', this.userController.loginUser);
    this.router.patch('/verify', verifyToken, this.userController.verifyUser);

    // Resend verification link
    this.router.post('/resend-verification', this.userController.resendVerificationLink);
    this.router.post('/request-password-reset', this.userController.requestPasswordReset);
    this.router.post('/reset-password', this.userController.resetPassword);
  }

  getRouter(): Router {
    return this.router;
  }
}
