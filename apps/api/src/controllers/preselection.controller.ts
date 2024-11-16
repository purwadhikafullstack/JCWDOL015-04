import { Request, Response } from 'express';
import prisma from '@/prisma';

export class PreSelectionTestController {
    async createTest(req: Request, res: Response) {
        try {
          const { jobId } = req.body;
      
          if (!jobId) {
            return res.status(400).json({ msg: 'Job ID is required' });
          }
      
          const test = await prisma.preSelectionTest.create({
            data: {
              job: { connect: { job_id: jobId } },
            },
          });
      
          res.status(201).json({ test });
        } catch (error: any) {
          console.error('Error creating test:', error);
          res.status(500).json({ msg: 'Failed to create test', error: error.message });
        }
      }
      

  async addQuestion(req: Request, res: Response) {
    try {
      const { testId, questionText, options, correctAnswer } = req.body;

      if (!testId || !questionText || !options || correctAnswer === undefined) {
        return res.status(400).json({
          msg: 'Test ID, question text, options, and correct answer are required',
        });
      }

      const question = await prisma.testQuestion.create({
        data: {
          question_text: questionText,
          test_id: testId,
          correct_answer: correctAnswer,
          options: {
            create: options.map((option: { text: string }) => ({
              option_text: option.text,
            })),
          },
        },
      });

      res.status(201).json({ question });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ msg: 'Failed to add question' });
    }
  }

  async getTestWithQuestions(req: Request, res: Response) {
    try {
      const { testId } = req.params;

      const test = await prisma.preSelectionTest.findUnique({
        where: { test_id: parseInt(testId, 10) },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      if (!test) {
        return res.status(404).json({ msg: 'Test not found' });
      }

      res.status(200).json({ test });
    } catch (error) {
      console.error('Error fetching test with questions:', error);
      res.status(500).json({ msg: 'Failed to fetch test with questions' });
    }
  }
  async saveTestAnswer(req: Request, res: Response) {
    try {
      const { userId, testId, questionId, selectedOption } = req.body;

      // Validasi input
      if (!userId || !testId || !questionId || selectedOption == null) {
        return res.status(400).json({ msg: 'All fields are required' });
      }

      // Periksa apakah jawaban benar
      const question = await prisma.testQuestion.findUnique({
        where: { question_id: questionId },
        include: { options: true },
      });

      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      const isCorrect = question.correct_answer === selectedOption;

      // Simpan jawaban ke database
      const testAnswer = await prisma.testAnswer.create({
        data: {
          user_id: userId,
          test_id: testId,
          question_id: questionId,
          selected_option: selectedOption,
          is_correct: isCorrect,
        },
      });

      res.status(201).json({ msg: 'Answer saved successfully!', answer: testAnswer });
    } catch (error) {
      console.error('Error saving test answer:', error);
      res.status(500).json({ msg: 'Failed to save answer' });
    }
  }
}
