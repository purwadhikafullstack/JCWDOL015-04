'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  CircularProgress,
} from '@mui/material';

// Definisikan tipe untuk soal dan jawaban
type Question = {
  question_id: number;
  question_text: string;
  options: { option_id: number; option_text: string }[];
};

const PreSelectionTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/preselection/1`);
        const data = await response.json();
  
        if (response.ok && data.test && data.test.questions) {
          setQuestions(data.test.questions);
        } else {
          console.error("Invalid data format:", data);
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const userId = 1;
      const testId = 1; 
      const answers = Object.entries(userAnswers).map(([questionId, optionId]) => ({
        questionId: parseInt(questionId),
        selectedOptionId: optionId,
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/preselection/save-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          testId,
          answers,
        }),
      });

      if (response.ok) {
        alert("Test submitted successfully! Mohon tunggu pemberitahuan selanjutnya.");
      } else {
        alert("Failed to submit test");
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert("Error submitting test");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8 text-center">
        <CircularProgress />
        <Typography variant="h6">Loading questions...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8">
      <Typography variant="h4" align="center" gutterBottom>
        Pre-Selection Test
      </Typography>

      {questions.map((q) => (
        <div key={q.question_id} className="mb-6 p-4 border rounded-md bg-gray-100">
          <Typography variant="h6" gutterBottom>
            {q.question_text}
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              name={`question${q.question_id}`}
              value={userAnswers[q.question_id] || ''}
              onChange={(e) => handleAnswerChange(q.question_id, parseInt(e.target.value))}
            >
              {q.options.map((option) => (
                <FormControlLabel
                  key={option.option_id}
                  value={option.option_id}
                  control={<Radio color="primary" />}
                  label={option.option_text}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ))}

      <div className="text-center mt-8">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="submit-button"
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
          Submit Test
        </Button>
      </div>
    </Container>
  );
};

export default PreSelectionTest;
