import { Router } from 'express';
import { PaymentController } from '@/controllers/payment.controller';
import { verifyToken } from '@/middlewares/token';
import { checkDeveloperRole } from '@/middlewares/checkRole';
import { uploader } from '@/middlewares/uploader';

export class PaymentRouter {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = new PaymentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Endpoint untuk upload bukti pembayaran
    this.router.post(
      '/upload',
      verifyToken,
      uploader('payment', 'payment').single('file'), // Menggunakan uploader
      this.paymentController.uploadPaymentProof,
    );

    // Endpoint untuk konfirmasi pembayaran (hanya developer)
    this.router.post(
      '/confirm',
      verifyToken,
      checkDeveloperRole,
      this.paymentController.confirmPayment,
    );

    // Endpoint untuk mendapatkan bukti pembayaran
    this.router.get(
      '/proof/:subscriptionId',
      verifyToken,
      this.paymentController.getPaymentProof,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
