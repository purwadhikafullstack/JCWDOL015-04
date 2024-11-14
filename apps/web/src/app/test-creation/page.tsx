'use client';

import React, { useState } from 'react';
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

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const TestCreation: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(Array.from({ length: 25 }, () => ({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  })));

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

  const handleSubmit = () => {
    console.log("Daftar Pertanyaan:", questions);
    alert("Tes berhasil disimpan!");
  };

  return (
    <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8">
      <Typography variant="h4" align="center" gutterBottom>
        Buat Pre-Selection Test
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
          </FormControl>
        </div>
      ))}

      <div className="text-center mt-8">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
            '&:hover': {
              backgroundColor: "#0056b3"
            }
          }}
        >
          Simpan Tes
        </Button>
      </div>
    </Container>
  );
};

export default TestCreation;
