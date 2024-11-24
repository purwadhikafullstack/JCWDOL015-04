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

      // Cari data UserAssessmentScore berdasarkan score_id dan user_id
      const userAssessmentScore =
        await this.prisma.userAssessmentScore.findFirst({
          where: { score_id: parsedScoreId, user_id, status: 'passed' },
          include: {
            user: true, // Pastikan data user dimuat langsung
            skillAssessment: true, // Memuat data skillAssessment jika diperlukan
          },
        });

      if (!userAssessmentScore) {
        res.status(404).json({
          message: 'No passed assessments found for the provided score ID.',
        });
        return;
      }

      // Pastikan status adalah "passed"
      if (userAssessmentScore.status !== 'passed') {
        res.status(400).json({
          message: 'Certificate can only be generated for passed assessments.',
        });
        return;
      }

      // Buat QR code data
      const qrCodeData = await QRCode.toDataURL(
        `${process.env.URL_WEB!}/certificate-verify?code=${userAssessmentScore.unique_code}`,
      );

      // Panggil fungsi generate PDF
      await certificatePDF(res, {
        score_id: userAssessmentScore.score_id, // Langsung gunakan score_id
        assessment_data:
          typeof userAssessmentScore.skillAssessment?.assessment_data ===
          'string'
            ? userAssessmentScore.skillAssessment?.assessment_data
            : JSON.stringify(
                userAssessmentScore.skillAssessment?.assessment_data,
              ) || 'Assessment data not available',
        score: userAssessmentScore.score!, // Ambil skor langsung dari userAssessmentScore
        user_name: `${userAssessmentScore.user?.first_name || 'Unknown'} ${
          userAssessmentScore.user?.last_name || 'User'
        }`, // Langsung ambil nama dari userAssessmentScore -> user
        badge: userAssessmentScore.badge || 'No badge', // Ambil badge langsung dari userAssessmentScore
        qrCodeData, // QR code yang sudah di-generate
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async verifyCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;
  
      // Validasi parameter code
      if (!code || typeof code !== 'string' || code.length !== 36) {
        res.status(400).json({ message: 'Invalid or missing certificate code.' });
        return;
      }
  
      // Cari berdasarkan `unique_code`
      const userAssessmentScore = await this.prisma.userAssessmentScore.findUnique({
        where: { unique_code: code },
        include: {
          user: true, // Memuat data pengguna
          skillAssessment: true, // Memuat data skillAssessment
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
  
      // Return valid certificate details, termasuk unique_code
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
      console.error('Error verifying certificate:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  
}
