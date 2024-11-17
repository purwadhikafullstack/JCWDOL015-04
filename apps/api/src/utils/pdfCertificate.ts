// pdfGenerator.ts
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import { Response } from "express";

export const certificatePDF = async (
    res: Response,
    assessmentData: {
      assessment_id: number;
      assessment_data: string;
      score: number;
      user_name: string;
      qrCodeData: string; // Add this property
    }
  ) => {
    try {
      const doc = new PDFDocument();
      const chunks: any[] = [];
  
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=certificate_${assessmentData.assessment_id}.pdf`
        );
        res.send(result);
      });
  
      // Add content to PDF
      doc.fontSize(20).text("Certificate of Achievement", { align: "center" });
      doc.moveDown(2);
      doc.fontSize(16).text(`This certifies that`, { align: "center" });
      doc.fontSize(24).text(assessmentData.user_name, { align: "center" });
      doc.moveDown(2);
      doc.fontSize(16).text(`has successfully completed the assessment:`, { align: "center" });
      doc.fontSize(18).text(assessmentData.assessment_data, { align: "center" });
      doc.moveDown(2);
      doc.fontSize(16).text(`with a score of ${assessmentData.score}.`, { align: "center" });
  
      // Add QR code to the PDF
      doc.moveDown(2);
      doc.text("Scan the QR code to verify this certificate:", { align: "center" });
      doc.moveDown(1);
      const imageBuffer = Buffer.from(assessmentData.qrCodeData.split(",")[1], "base64"); // Convert Base64 to Buffer
      doc.image(imageBuffer, doc.page.width / 2 - 50, doc.y, { fit: [100, 100] });
  
      doc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Error generating PDF", error });
    }
  };
  