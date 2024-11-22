import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { certificatePDF } from '@/utils/pdfCertificate';
import QRCode from 'qrcode';

export class CertificateController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async generateCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.user || {};
      const { assessment_id } = req.params;

      if (!user_id) {
        res.status(401).json({ message: 'Unauthorized. User ID not found.' });
        return;
      }

      const parsedAssessmentId = parseInt(assessment_id, 10);
      if (isNaN(parsedAssessmentId)) {
        res.status(400).json({ message: 'Invalid assessment_id provided.' });
        return;
      }

      // Find UserAssessmentScore for the given user and assessment
      const userAssessmentScore =
        await this.prisma.userAssessmentScore.findFirst({
          where: { user_id, assessment_id: parsedAssessmentId },
          include: {
            user: true,
            skillAssessment: true,
          },
        });

      if (!userAssessmentScore) {
        res
          .status(404)
          .json({
            message:
              'Assessment score not found or does not belong to the user.',
          });
        return;
      }

      if (userAssessmentScore.status !== 'passed') {
        res
          .status(400)
          .json({
            message:
              'Certificate can only be generated for passed assessments.',
          });
        return;
      }

      // Generate QR code data
      const qrCodeData = await QRCode.toDataURL(
        `${process.env.URL_WEB!}/certificate/verify?code=${userAssessmentScore.unique_code}`,
      );

      // Generate PDF certificate
      await certificatePDF(res, {
        assessment_id: userAssessmentScore.assessment_id,
        assessment_data:
          typeof userAssessmentScore.skillAssessment.assessment_data === 'string'
            ? userAssessmentScore.skillAssessment.assessment_data
            : JSON.stringify(userAssessmentScore.skillAssessment.assessment_data) ||
              'Assessment data not available',
        score: userAssessmentScore.score!,
        user_name: `${userAssessmentScore.user.first_name} ${userAssessmentScore.user.last_name}`,
        badge: userAssessmentScore.badge || 'No badge',
        qrCodeData,
      });
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async verifyCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        res
          .status(400)
          .json({ message: 'Invalid or missing certificate code.' });
        return;
      }

      // Cari berdasarkan `unique_code`
      const userAssessmentScore =
        await this.prisma.userAssessmentScore.findUnique({
          where: { unique_code: code },
          include: {
            user: true,
            skillAssessment: true,
          },
        });

      if (!userAssessmentScore) {
        res.status(404).json({ message: 'Certificate not found.' });
        return;
      }

      if (userAssessmentScore.status !== 'passed') {
        res.status(400).json({ message: 'This certificate is not verified.' });
        return;
      }

      // Return valid certificate details
      res.status(200).json({
        message: 'Certificate is valid',
        certificate: {
          user_name: `${userAssessmentScore.user.first_name} ${userAssessmentScore.user.last_name}`,
          assessment_id: userAssessmentScore.assessment_id,
          badge: userAssessmentScore.badge,
          score: userAssessmentScore.score,
          issued_at: userAssessmentScore.created_at,
        },
      });
    } catch (error) {
      console.error('Error verifying certificate:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
