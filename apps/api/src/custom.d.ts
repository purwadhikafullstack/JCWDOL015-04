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

declare namespace Express {
  export interface Request {
    user?: {
      user_id: number;
      role: string; // Tambahkan role
    };
    assessment_id?: number;
  }
}
