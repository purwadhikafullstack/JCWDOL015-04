'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';
import base_url from '@/lib/user';

type Question = {
  questionId?: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const TestCreation = ({ params }: { params: { id: string } }) => {
    const jobId = params.id; // Ambil jobId langsung dari params
    const [testId, setTestId] = useState<number | null>(null);
    const [questions, setQuestions] = useState<Question[]>(
      Array.from({ length: 25 }, () => ({
        questionId: undefined,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      }))
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExistingTest = async () => {
          try {
            const response = await fetch(`${base_url}/preselection/get-questions/${jobId}`);
            if (response.ok) {
              const data = await response.json();
              
              setTestId(data.testId); // Simpan test_id
    
              const existingQuestions = data.questions.map((q: any) => ({
                questionId: q.questionId || undefined,
                question: q.questionText,
                options: q.options.map((opt: any) => opt.text),
                correctAnswer: q.options[q.correctAnswer - 1]?.text || '',
              }));
    
              const totalQuestions = [...existingQuestions];
              while (totalQuestions.length < 25) {
                totalQuestions.push({
                  questionId: undefined,
                  question: '',
                  options: ['', '', '', ''],
                  correctAnswer: '',
                });
              }
    
              setQuestions(totalQuestions);
            } else {
              console.error('Failed to fetch existing questions');
            }
          } catch (error) {
            console.error('Error fetching existing test:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchExistingTest();
      }, [jobId]);
  
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      if (!testId) {
        alert('Test ID tidak ditemukan. Pastikan tes ini terkait dengan job.');
        return;
      }

      const formattedQuestions = questions
        .filter(
          (q) =>
            q.question.trim() !== '' &&
            q.options.every((opt) => opt.trim() !== '') &&
            q.correctAnswer.trim() !== '' &&
            q.options.includes(q.correctAnswer)
        )
        .map((q) => {
          const formattedQuestion: any = {
            questionText: q.question,
            options: q.options.map((opt) => ({ text: opt })),
            correctAnswer: q.options.indexOf(q.correctAnswer) + 1,
          };

          if (q.questionId !== undefined && q.questionId !== null) {
            formattedQuestion.questionId = q.questionId;
          }

          return formattedQuestion;
        });

      if (formattedQuestions.length === 0) {
        alert('Tidak ada soal valid untuk disimpan. Pastikan semua soal terisi dengan benar.');
        return;
      }

      const requestBody = {
        test_id: testId,
        questions: formattedQuestions,
      };

      console.log('Data yang dikirim ke API:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${base_url}/preselection/add-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Tes berhasil disimpan!');
      } else {
        const errorData = await response.json();
        console.error('Error dari server:', errorData);
        alert('Gagal menyimpan tes. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saving test:', error);
      alert('Terjadi kesalahan saat menyimpan tes.');
    }
  };

  if (loading) {
    return <Typography align="center">Memuat soal...</Typography>;
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8">
        <Typography variant="h4" align="center" gutterBottom>
          Buat atau Edit Pre-Selection Test
        </Typography>

        {questions.map((q, index) => (
          <div key={index} className="mb-6 p-4 border rounded-md bg-gray-100">
            <Typography variant="h6" gutterBottom>
              Pertanyaan {index + 1}
            </Typography>

            <TextField
              label="Pertanyaan"
              variant="outlined"
              fullWidth
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              error={q.question.trim() === ''}
              helperText={q.question.trim() === '' ? 'Pertanyaan tidak boleh kosong' : ''}
              className="mb-4"
            />

            <Typography variant="subtitle1">Pilihan Jawaban:</Typography>
            {q.options.map((option, optIndex) => (
              <Box key={optIndex} mb={2}>
                <TextField
                  label={`Pilihan ${optIndex + 1}`}
                  variant="outlined"
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  error={option.trim() === ''}
                  helperText={option.trim() === '' ? 'Pilihan tidak boleh kosong' : ''}
                />
              </Box>
            ))}

            <Typography variant="subtitle1" className="mt-4">
              Pilih Jawaban Benar:
            </Typography>
            <FormControl fullWidth variant="outlined" className="mt-2">
              <Select
                value={q.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value as string)}
                displayEmpty
                error={q.correctAnswer.trim() === ''}
              >
                <MenuItem value="" disabled>
                  Pilih jawaban yang benar
                </MenuItem>
                {q.options.map((option, optIndex) => (
                  <MenuItem key={optIndex} value={option}>
                    {`Pilihan ${optIndex + 1}`}
                  </MenuItem>
                ))}
              </Select>
              {q.correctAnswer.trim() === '' && (
                <Typography variant="caption" color="error">
                  Pilih jawaban yang benar
                </Typography>
              )}
            </FormControl>
          </div>
        ))}

        <div className="text-center mt-8">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Simpan Tes
          </Button>
        </div>
      </Container>
    </ProtectedRoute>
  );
};

export default TestCreation;
