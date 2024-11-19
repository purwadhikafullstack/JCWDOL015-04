import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploader = (
  filePrefix: string,
  fileType: 'resume' | 'profile_picture' | 'logo' | 'banner' | 'payment'
) => {
  // Define default directories for each file type
  const directories = {
    resume: path.join(__dirname, '../../public/resumes'),
    profile_picture: path.join(__dirname, '../../public/profile_pictures'),
    logo: path.join(__dirname, '../../public/company_logos'),
    banner: path.join(__dirname, '../../public/company_banners'),
    payment: path.join(__dirname, '../../public/payment-proof'),
  };


  const defaultDir = directories[fileType];
  const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  };

  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
      ensureFolderExists(defaultDir);
      cb(null, defaultDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
      const originalNameParts = file.originalname.split('.');
      const fileExtension = originalNameParts[originalNameParts.length - 1].toLowerCase();
      const newFileName = `${filePrefix}_${Date.now()}.${fileExtension}`;
      cb(null, newFileName);
    },
  });
  

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const allowedDocumentTypes = ['application/pdf'];
  
    if (
      (fileType === 'profile_picture' || fileType === 'logo' || fileType === 'banner') &&
      allowedImageTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else if (fileType === 'resume' && allowedDocumentTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (fileType === 'payment' && allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  };
  

  // Define max file size
  const maxSize = fileType === 'profile_picture' ? 1 * 1024 * 1024 : 5 * 1024 * 1024; // 1MB for profile pictures, 5MB for others

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  });
};

