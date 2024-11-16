import { Request, Response } from 'express';
import prisma from '../prisma'; // Adjust path as needed
import { generatePdf } from '../utils/pdfGenerator'; // Utility for PDF export

export class CvController {
  // Create or Update CV
  async createOrUpdateCV(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id;
      const { template, content } = req.body;

      if (!user_id) {
        return res
          .status(401)
          .json({ status: 'error', message: 'Unauthorized' });
      }

      // Check if user already has a CV
      const existingCv = await prisma.cV.findFirst({
        where: { user_id },
      });

      if (existingCv) {
        // Update the existing CV
        const updatedCv = await prisma.cV.update({
          where: { cv_id: existingCv.cv_id },
          data: { template, content },
        });

        return res.status(200).json({
          status: 'success',
          message: 'CV updated successfully',
          data: updatedCv,
        });
      }

      // Create a new CV if not exists
      const newCv = await prisma.cV.create({
        data: {
          user_id,
          template,
          content,
        },
      });

      res.status(201).json({
        status: 'success',
        message: 'CV created successfully',
        data: newCv,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ status: 'error', message });
    }
  }

  // Get CV
  async getCVbyId(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id; // Ambil user_id dari middleware autentikasi
      const cv_id = parseInt(req.params.cv_id, 10); // Konversi cv_id ke integer
  
      // Validasi jika cv_id bukan angka
      if (isNaN(cv_id)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid CV ID. It should be a number.',
        });
      }
  
      // Cari CV berdasarkan cv_id
      const cv = await prisma.cV.findUnique({
        where: { cv_id },
      });
  
      // Jika CV tidak ditemukan
      if (!cv) {
        return res.status(404).json({
          status: 'error',
          message: `CV with ID ${cv_id} not found.`,
        });
      }
  
      // Pastikan hanya pemilik CV yang dapat mengakses
      if (cv.user_id !== user_id) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden. You do not have access to this CV.',
        });
      }
  
      // Jika valid, kirim respons sukses
      res.status(200).json({
        status: 'success',
        data: cv,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error fetching CV:', error); // Logging untuk debugging
      res.status(500).json({
        status: 'error',
        message,
      });
    }
  }
  
  async getCvs(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id;
  
      if (!user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const cvs = await prisma.cV.findMany({
        where: { user_id },
      });
  
      if (!cvs || cvs.length === 0) {
        return res.status(404).json({ message: 'No CVs found for this user.' });
      }
  
      res.status(200).json({ cvs });
    } catch (error) {
      console.error('Error fetching CVs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  // Download CV
  async downloadCV(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id;
      const cv_id = parseInt(req.params.cv_id, 10); // Konversi ke integer

      if (isNaN(cv_id)) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid CV ID' });
      }

      const cv = await prisma.cV.findUnique({
        where: { cv_id },
      });

      if (!cv) {
        return res
          .status(404)
          .json({ status: 'error', message: 'CV not found' });
      }

      if (cv.user_id !== user_id) {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }

      const pdfBuffer = await generatePdf(cv.content);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="cv-${cv_id}.pdf"`,
      );
      res.send(pdfBuffer);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ status: 'error', message });
    }
  }
}
