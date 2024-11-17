// custom.d.ts

type User = {
  user_id: number;
  role: string;
};



declare namespace Express {
  export interface Request {
    user?: {
      user_id: number;
      role: string;
    };
    file?: Express.Multer.File; // Properti file untuk single file upload
    files?: { [fieldname: string]: Express.Multer.File[] }; // Properti files untuk multiple upload
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      user_id: number;
      role: string;
    };
    assessment_id?: number;
  }
}
