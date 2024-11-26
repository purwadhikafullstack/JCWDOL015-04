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
      const { score_id } = req.params;

      const parsedScoreId = parseInt(score_id, 10);
      if (isNaN(parsedScoreId)) {
        res.status(400).json({ message: 'Invalid score_id provided.' });
        return;
      }

      const userAssessmentScore =
        await this.prisma.userAssessmentScore.findFirst({
          where: { score_id: parsedScoreId, user_id, status: 'passed' },
          include: {
            user: true,
            skillAssessment: true,
          },
        });

      if (!userAssessmentScore) {
        res.status(404).json({
          message: 'No passed assessments found for the provided score ID.',
        });
        return;
      }

      if (userAssessmentScore.status !== 'passed') {
        res.status(400).json({
          message: 'Certificate can only be generated for passed assessments.',
        });
        return;
      }

      const qrCodeData = await QRCode.toDataURL(
        `${process.env.URL_WEB!}/certificate-verify?code=${userAssessmentScore.unique_code}`,
      );
      await certificatePDF(res, {
        score_id: userAssessmentScore.score_id,
        assessment_data:
          typeof userAssessmentScore.skillAssessment?.assessment_data ===
          'string'
            ? userAssessmentScore.skillAssessment?.assessment_data
            : JSON.stringify(
                userAssessmentScore.skillAssessment?.assessment_data,
              ) || 'Assessment data not available',
        score: userAssessmentScore.score!,
        user_name: `${userAssessmentScore.user?.first_name || 'Unknown'} ${
          userAssessmentScore.user?.last_name || 'User'
        }`,
        badge: userAssessmentScore.badge || 'No badge',
        qrCodeData,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async verifyCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;
  
      if (!code || typeof code !== 'string' || code.length !== 36) {
        res.status(400).json({ message: 'Invalid or missing certificate code.' });
        return;
      }
  
      const userAssessmentScore = await this.prisma.userAssessmentScore.findUnique({
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
  
      res.status(200).json({
        message: 'Certificate is valid',
        certificate: {
          unique_code: userAssessmentScore.unique_code,
          user_name: `${userAssessmentScore.user.first_name} ${userAssessmentScore.user.last_name}`,
          assessment_name:
            userAssessmentScore.skillAssessment?.assessment_data || "Unknown Assessment",
          badge: userAssessmentScore.badge,
          score: userAssessmentScore.score,
          issued_at: userAssessmentScore.created_at,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  
}
