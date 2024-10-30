import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploader = (
  filePrefix: string,
  fileType: 'resume' | 'profile_picture' | 'company_logo' | 'company_banner'
) => {
  // Define default directories for each file type
  const directories = {
    resume: path.join(__dirname, '../../public/resumes'),
    profile_picture: path.join(__dirname, '../../public/profile_pictures'),
    company_logo: path.join(__dirname, '../../public/company_logos'),
    company_banner: path.join(__dirname, '../../public/company_banners'),
  };

  // Get the directory based on the fileType
  const defaultDir = directories[fileType];

  // Check if the folder exists, if not, create it
  const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  };

  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      // Ensure the appropriate folder exists
      ensureFolderExists(defaultDir);
      cb(null, defaultDir);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      const originalNameParts = file.originalname.split('.');
      const fileExtension =
        originalNameParts[originalNameParts.length - 1].toLowerCase();
      const newFileName = `${filePrefix}_${Date.now()}.${fileExtension}`;
      cb(null, newFileName);
    },
  });

  // File filter for validation based on the type
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileExtension = file.mimetype;

    if (fileType === 'resume' && fileExtension === 'application/pdf') {
      cb(null, true); // Allow PDF for resume
    } else if (
      (fileType === 'profile_picture' || fileType === 'company_logo' || fileType === 'company_banner') &&
      allowedImageTypes.includes(fileExtension)
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  // Define max file size (e.g., 5 MB for images and resume)
  const maxSize = fileType === 'profile_picture' ? 1 * 1024 * 1024 : 5 * 1024 * 1024; // 1MB for profile pictures, 5MB for others

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  });
};