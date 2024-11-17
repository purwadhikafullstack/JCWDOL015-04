// custom.d.ts

type User = {
  user_id: number;
  role: string;
};



declare namespace Express {
  export interface Request {
    user?: User;
    files?: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    };
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
