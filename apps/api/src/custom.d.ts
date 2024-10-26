// custom.d.ts

type User = {
  user_id: number;
  role: string;
};

declare namespace Express {
    export interface Request {
        user?: User
    }
}