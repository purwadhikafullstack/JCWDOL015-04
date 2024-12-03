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
      res
        .status(500)
        .json({ msg: 'Failed to create test', error: error.message });
    }
  }

  async addQuestion(req: Request, res: Response) {
    try {
      const { test_id, questions } = req.body;

      if (!test_id || !Array.isArray(questions)) {
        return res.status(400).json({
          msg: 'Test ID and questions are required',
        });
      }

      for (const question of questions) {
        if (question.questionId) {
          // Jika questionId ada, update pertanyaan
          await prisma.testQuestion.update({
            where: { question_id: question.questionId },
            data: {
              question_text: question.questionText,
              correct_answer: question.correctAnswer,
              options: {
                deleteMany: {}, // Hapus opsi lama
                create: question.options.map((opt: { text: string }) => ({
                  option_text: opt.text,
                })),
              },
            },
          });
        } else {
          // Jika questionId tidak ada, buat pertanyaan baru
          await prisma.testQuestion.create({
            data: {
              test_id: parseInt(test_id, 10),
              question_text: question.questionText,
              correct_answer: question.correctAnswer,
              options: {
                create: question.options.map((opt: { text: string }) => ({
                  option_text: opt.text,
                })),
              },
            },
          });
        }
      }

      res.status(200).json({ msg: 'Questions added or updated successfully' });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
        error: err, 
      });
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
      const { userId, testId, answers } = req.body;
  
      if (!userId || !testId || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ msg: 'All fields are required' });
      }
  
      const savedAnswers = [];
  
      for (const answer of answers) {
        const { questionId, selectedOption } = answer;
  
        if (!questionId || selectedOption == null) {
          return res
            .status(400)
            .json({ msg: 'Each answer must include questionId and selectedOption' });
        }
  
        const question = await prisma.testQuestion.findUnique({
          where: { question_id: questionId },
          include: { options: true },
        });
  
        if (!question) {
          return res.status(404).json({ msg: `Question not found: ${questionId}` });
        }
  
        const isCorrect = question.correct_answer === selectedOption;
  
        const testAnswer = await prisma.testAnswer.create({
          data: {
            user_id: userId,
            test_id: testId,
            question_id: questionId,
            selected_option: selectedOption,
            is_correct: isCorrect,
          },
        });
  
        savedAnswers.push(testAnswer);
      }
  
      res
        .status(201)
        .json({ msg: 'Answers saved successfully!', answers: savedAnswers });
    } catch (error) {
      console.error('Error saving test answers:', error);
      res.status(500).json({ msg: 'Failed to save answers' });
    }
  }
  

  async getQuestionsByJobId(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
  
      if (!jobId) {
        return res.status(400).json({ msg: 'Job ID is required' });
      }
  
      const test = await prisma.preSelectionTest.findUnique({
        where: {
          job_id: parseInt(jobId, 10), // Cari berdasarkan job_id
        },
        include: {
          questions: {
            include: {
              options: true, // Sertakan opsi pertanyaan
            },
          },
        },
      });
  
      if (!test) {
        return res.status(404).json({ msg: 'No test found for this job ID' });
      }
  
      const questions = test.questions.map((question) => ({
        questionId: question.question_id,
        questionText: question.question_text,
        options: question.options.map((option) => ({
          optionId: option.option_id,
          text: option.option_text,
        })),
        correctAnswer: question.correct_answer,
      }));
  
      res.status(200).json({
        testId: test.test_id, // Tambahkan test_id ke respons
        questions,
      });
    } catch (error) {
      console.error('Error fetching questions by job ID:', error);
      res.status(500).json({ msg: 'Failed to fetch questions by job ID' });
    }
  }
  

  async checkTest(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
  
      const test = await prisma.preSelectionTest.findUnique({
        where: { job_id: parseInt(jobId, 10) },
      });
  
      res.status(200).json({ hasTest: !!test });
    } catch (error) {
      console.error('Error checking test:', error);
      res.status(500).json({ msg: 'Gagal memeriksa tes' });
    }
  }
  
}
