import { PreSelectionTestController } from '@/controllers/preselection.controller';
import { verifyToken } from '@/middlewares/token';
import { checkAdminDev } from '@/middlewares/checkRole';
import { Router } from 'express';

export class PreSelectionTestRouter {
  private router: Router;
  private preSelectionTestController: PreSelectionTestController;

  constructor() {
    this.preSelectionTestController = new PreSelectionTestController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Rute untuk membuat Pre-Selection Test baru
    this.router.post(
      '/create-test',
      verifyToken,
      checkAdminDev,
      (req, res) => this.preSelectionTestController.createTest(req, res)
    );

    // Rute untuk menambahkan pertanyaan ke dalam Pre-Selection Test
    this.router.post(
      '/add-question',
    //   verifyToken,
    //   checkAdminDev,
      (req, res) => this.preSelectionTestController.addQuestion(req, res)
    );

    // Rute untuk mendapatkan Pre-Selection Test beserta soal dan opsi jawabannya
    this.router.get(
      '/:testId',
      (req, res) => this.preSelectionTestController.getTestWithQuestions(req, res)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
