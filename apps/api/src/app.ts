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
import { UserRouter } from './routers/user.router';
import { JobRouter } from './routers/job.router';
import { NotificationRouter } from './routers/notification.router';
import { ApplicationRouter } from './routers/application.router';
import { FavoriteJobRouter } from './routers/favoriteJob.router';
import { CompanyRouter } from './routers/company.router';

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
    const userRouter = new UserRouter();
    const jobRouter = new JobRouter();
    const notificationRouter = new NotificationRouter();
    const applicationRouter = new ApplicationRouter();
    const favoriteJobRouter = new FavoriteJobRouter();
    const companyRouter = new CompanyRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/jobs', jobRouter.getRouter());
    this.app.use('/api/notifications', notificationRouter.getRouter());
    this.app.use('/api/applications', applicationRouter.getRouter());
    this.app.use('/api/favorite-job', favoriteJobRouter.getRouter());
    this.app.use('/api/companies', companyRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/api`);
    });
  }
}
