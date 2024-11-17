import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { SubsTypeRouter } from './routers/plan.router';
import { ReviewRouter } from './routers/review.router';
import { SubscriptionDashboardRouter } from './routers/subs-dashboard.router';
import { PaymentRouter } from './routers/payment.router';
import { UserRouter } from './routers/user.router';
import { CvRouter } from './routers/cv.router';
import { PlanBillRouter } from './routers/userplan.router';
import { AssessmentRouter } from './routers/assessment.router';
import { CertificateRouter } from './routers/certificate.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public', express.static('public'));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {

    const planRouter = new SubsTypeRouter();
    const reviewRouter = new ReviewRouter();
    const subscriptRouter = new SubscriptionDashboardRouter();
    const paymentRouter = new PaymentRouter();
    const userRouter = new UserRouter();
    const CVRouter = new CvRouter();
    const userPlan = new PlanBillRouter();
    const assessmentRouter = new AssessmentRouter();
    const certificateRouter = new CertificateRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/plans', planRouter.getRouter());
    this.app.use('/api/review', reviewRouter.getRouter());
    this.app.use('/api/subscription', subscriptRouter.getRouter());
    this.app.use('/api/payment', paymentRouter.getRouter());
    this.app.use('/api/cv', CVRouter.getRouter());
    this.app.use('/api/plan-bill', userPlan.getRouter());
    this.app.use('/api/assessment', assessmentRouter.getRouter());
    this.app.use('/api/certificate', certificateRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/api`);
    });
  }
}
