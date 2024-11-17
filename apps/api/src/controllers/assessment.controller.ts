// assessmentController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AssessmentController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createAssessment(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.user?.user_id; // Extract user_id from req.user
      const { assessment_data, questions } = req.body;

      if (!user_id) {
        res.status(401).json({ message: 'Unauthorized. User ID is missing.' });
        return;
      }

      const user = await this.prisma.user.findUnique({ where: { user_id } });
      if (!user || user.role !== 'developer') {
        res.status(403).json({
          message: 'Access denied. Only developers can create assessments.',
        });
        return;
      }

      const newAssessment = await this.prisma.skillAssessment.create({
        data: {
          user_id,
          assessment_data,
          status: 'failed', // Default to failed
          questions: {
            create: questions.map((q: any) => ({
              question_text: q.question_text,
              question_type: q.question_type || 'multiple_choice', // Default type
              is_active: true, // Set is_active to true by default
              difficulty_level: q.difficulty_level || 'medium', // Default difficulty
              answers: {
                create: q.answers.map((a: any) => ({
                  answer_text: a.answer_text,
                  is_correct: a.is_correct,
                })),
              },
            })),
          },
        },
      });

      res.status(201).json({
        message: 'Assessment created successfully',
        assessment: newAssessment,
      });
    } catch (error) {
      console.error('Error creating assessment:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  public async getAllAssessments(req: Request, res: Response): Promise<void> {
    try {
      const assessments = await this.prisma.skillAssessment.findMany({
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      res.status(200).json({ assessments });
    } catch (error) {
      console.error('Error fetching all assessments:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async deleteAssessment(req: Request, res: Response): Promise<void> {
    try {
      const { assessment_id } = req.params;

      // Hapus jawaban terkait
      await this.prisma.assessmentAnswer.deleteMany({
        where: {
          question: {
            assessment_id: parseInt(assessment_id, 10),
          },
        },
      });

      // Hapus pertanyaan terkait
      await this.prisma.assessmentQuestion.deleteMany({
        where: {
          assessment_id: parseInt(assessment_id, 10),
        },
      });

      // Hapus data assessment
      await this.prisma.skillAssessment.delete({
        where: { assessment_id: parseInt(assessment_id, 10) },
      });

      res.status(200).json({ message: 'Assessment deleted successfully' });
    } catch (error) {
      console.error('Error deleting assessment:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async getUserAssessments(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;

      const assessments = await this.prisma.skillAssessment.findMany({
        where: { user_id: parseInt(user_id, 10) },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      res.status(200).json({ assessments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public async startAssessment(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.user?.user_id;
  
      if (!user_id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      const { assessment_id } = req.params;
  
      // Cari assessment berdasarkan assessment_id dan sertakan pertanyaan serta jawabannya
      const assessment = await this.prisma.skillAssessment.findUnique({
        where: { assessment_id: parseInt(assessment_id, 10) },
        include: {
          questions: {
            include: {
              answers: true, // Sertakan jawaban untuk setiap pertanyaan
            },
          },
        },
      });
  
      if (!assessment) {
        res.status(404).json({ message: 'Assessment not found' });
        return;
      }
  
      // Update assessment_date ke waktu sekarang
      await this.prisma.skillAssessment.update({
        where: { assessment_id: parseInt(assessment_id, 10) },
        data: {
          assessment_date: new Date(),
        },
      });
  
      // Buat token dengan JWT
      const token = jwt.sign(
        {
          user_id,
          assessment_id: parseInt(assessment_id, 10), // Gunakan assessment_id langsung
        },
        process.env.SECRET_JWT!,
        { expiresIn: '30m' }, // Token berlaku 30 menit
      );
  
      // Kirim respons dengan token, informasi assessment, pertanyaan, dan jawaban
      res.status(200).json({
        message: 'Assessment started',
        token, // Token untuk validasi saat submit
        time_limit: 30, // Batas waktu dalam menit
        assessment: {
          assessment_id,
          assessment_data: assessment.assessment_data,
          user_id: assessment.user_id,
          assessment_date: assessment.assessment_date,
          questions: assessment.questions, // Sertakan pertanyaan dan jawabannya
        },
      });
    } catch (error) {
      console.error('Error starting assessment:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  

  public async submitAssessment(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized: Missing token' });
        return;
      }

      // Ekstrak token dari header
      const token = authHeader.split(' ')[1];
      let decodedToken: { user_id: number; assessment_id: number };

      try {
        // Verifikasi token JWT
        decodedToken = jwt.verify(token, process.env.SECRET_JWT!) as {
          user_id: number;
          assessment_id: number;
        };
      } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
      }

      const user_id = decodedToken.user_id;
      const assessment_id = decodedToken.assessment_id;

      const {
        responses,
      }: {
        responses: Array<{
          question_id: number;
          answer_id: number;
          answer_text: string;
        }>;
      } = req.body;

      // Validasi assessment berdasarkan token
      const assessment = await this.prisma.skillAssessment.findUnique({
        where: { assessment_id },
        include: { questions: true },
      });

      if (!assessment) {
        res.status(404).json({ message: 'Assessment not found' });
        return;
      }

      const totalQuestions = assessment.questions.length;
      const pointsPerQuestion = totalQuestions > 0 ? 100 / totalQuestions : 0;

      let totalScore = 0;

      for (const response of responses) {
        const answer = await this.prisma.assessmentAnswer.findUnique({
          where: { answer_id: response.answer_id },
        });

        if (answer && answer.is_correct) {
          totalScore += pointsPerQuestion;
        }

        await this.prisma.userAssessmentResponse.create({
          data: {
            user_id,
            question_id: response.question_id,
            answer_id: response.answer_id,
            assessment_id,
            answer_text: response.answer_text,
          },
        });
      }

      const isPassed = totalScore >= 75;

      await this.prisma.skillAssessment.update({
        where: { assessment_id },
        data: {
          score: Math.round(totalScore),
        },
      });

      if (isPassed) {
        await this.prisma.skillAssessment.update({
          where: { assessment_id },
          data: {
            badge: `Expert in ${assessment.assessment_data}`,
          },
        });
      }

      res.status(200).json({
        message: isPassed ? 'Assessment passed' : 'Assessment failed',
        score: Math.round(totalScore),
      });
    } catch (error) {
      console.error('Error submitting assessment:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
