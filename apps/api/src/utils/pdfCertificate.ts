import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const certificatePDF = async (
  res: Response,
  scoreData: {
    score_id: number;
    assessment_data: string;
    score: number;
    user_name: string;
    badge: string | null; // Properti badge
    qrCodeData: string; // Base64 data untuk QR Code
  },
): Promise<void> => {
  try {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];

    // Tangkap data PDF saat dibuat
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=certificate_${scoreData.score_id}.pdf`,
      );
      res.send(result);
    });

    // Tambahkan konten ke PDF
    doc.fontSize(26).font('Helvetica-Bold').text('Certificate of Achievement', {
      align: 'center',
    });
    doc.moveDown(2);
    doc.fontSize(16).font('Helvetica').text(`This certifies that`, {
      align: 'center',
    });
    doc.fontSize(22).font('Helvetica-Bold').text(scoreData.user_name, {
      align: 'center',
    });
    doc.moveDown(1);
    doc
      .fontSize(16)
      .font('Helvetica')
      .text(`has successfully completed the assessment:`, { align: 'center' });
    doc
      .fontSize(18)
      .font('Helvetica-Bold')
      .text(scoreData.assessment_data, {
        align: 'center',
      });
    doc.moveDown(1);
    doc
      .fontSize(16)
      .font('Helvetica')
      .text(`with a score of ${scoreData.score}.`, { align: 'center' });

    // Tambahkan badge jika tersedia
    if (scoreData.badge) {
      doc.moveDown(2);
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`Awarded Badge: ${scoreData.badge}`, { align: 'center' });
    }

    // Tambahkan QR code jika tersedia
    if (scoreData.qrCodeData) {
      doc.moveDown(2);
      doc
        .fontSize(12)
        .font('Helvetica')
        .text('Scan the QR code to verify this certificate:', {
          align: 'center',
        });
      const imageBuffer = Buffer.from(
        scoreData.qrCodeData.split(',')[1],
        'base64',
      ); // Konversi Base64 ke Buffer
      doc.moveDown(1).image(imageBuffer, doc.page.width / 2 - 50, doc.y, {
        fit: [100, 100],
      });
    }

    // Tambahkan footer
    doc.moveDown(7);
    doc
      .fontSize(10)
      .font('Helvetica-Oblique')
      .text(`Generated on: ${new Date().toLocaleDateString('id-ID')}`, {
        align: 'center',
      });

    // Akhiri PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF', error });
  }
};
