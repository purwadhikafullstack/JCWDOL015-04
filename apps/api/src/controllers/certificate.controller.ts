// certificateController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { certificatePDF } from '@/utils/pdfCertificate';
import QRCode from "qrcode";

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
        res.status(401).json({ message: "Unauthorized. User ID not found." });
        return;
      }
  
      const parsedAssessmentId = parseInt(assessment_id, 10);
      if (isNaN(parsedAssessmentId)) {
        res.status(400).json({ message: "Invalid assessment_id provided." });
        return;
      }
  
      const assessment = await this.prisma.skillAssessment.findFirst({
        where: { user_id, assessment_id: parsedAssessmentId },
        include: { user: true },
      });
  
      if (!assessment) {
        res.status(404).json({ message: "Assessment not found or does not belong to the user." });
        return;
      }
  
      if (assessment.status !== "passed") {
        res.status(400).json({ message: "Certificate can only be generated for passed assessments." });
        return;
      }
  
      const qrCodeData = await QRCode.toDataURL(
        `${process.env.URL_WEB!}/code=${assessment.assessment_id}`
      );
  
      await certificatePDF(res, {
        assessment_id: assessment.assessment_id,
        assessment_data: assessment.assessment_data || "Assessment data not available",
        score: assessment.score!,
        user_name: `${assessment.user.first_name} ${assessment.user.last_name}`,
        qrCodeData, // Pass the generated QR code
      });
    } catch (error) {
      console.error("Error generating certificate:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  public async verifyCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;
  
      // Validate and parse the certificate code
      const parsedCode = parseInt(code as string, 10);
      if (isNaN(parsedCode)) {
        res.status(400).json({ message: "Invalid certificate code provided." });
        return;
      }
  
      // Find the assessment with the provided code
      const assessment = await this.prisma.skillAssessment.findUnique({
        where: { assessment_id: parsedCode },
      });
  
      // Check if assessment exists and is marked as 'passed'
      if (!assessment) {
        res.status(404).json({ message: "Certificate not found." });
        return;
      }
  
      if (assessment.status !== "passed") {
        res.status(400).json({ message: "This certificate is not verified." });
        return;
      }
  
      // Return valid certificate details
      res.status(200).json({ message: "Certificate is valid", assessment });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  
  
}
