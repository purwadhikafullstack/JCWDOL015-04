
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;


const directories = {
  logo: path.join(__dirname, '../../public/company_logos'),
  banner: path.join(__dirname, '../../public/company_banners'),
};


const ensureFolderExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
    const defaultDir = directories[file.fieldname as keyof typeof directories];
    ensureFolderExists(defaultDir);
    cb(null, defaultDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const originalNameParts = file.originalname.split('.');
    const fileExtension = originalNameParts[originalNameParts.length - 1].toLowerCase();
    const newFileName = `${file.fieldname}_${Date.now()}.${fileExtension}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};

const maxSize = 5 * 1024 * 1024;

export const logoBannerUploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
]);
