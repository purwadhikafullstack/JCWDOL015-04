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
import base_url, { getUserInfo } from '@/lib/user';

type Question = {
  question_id: number;
  question_text: string;
  options: { option_id: number; option_text: string }[];
};

const PreSelectionTest = ({ params }: { params: { id: string } }) => {
  const jobId = params.id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [testId, setTestId] = useState<number | null>(null);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response.ok && response.user) {
          setUserId(response.user.user_id);
        } else {
          console.error('Gagal mendapatkan informasi pengguna');
          alert('Anda harus login untuk mengakses halaman ini.');
          window.location.href = '/sign-in';
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (!jobId || !userId) return;
  
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${base_url}/preselection/get-questions/${jobId}`);
        const data = await response.json();
  
        if (response.ok && data.questions && data.testId) {
          setTestId(data.testId);
  
          const parsedQuestions = data.questions.map((q: any) => ({
            question_id: q.questionId,
            question_text: q.questionText,
            options: q.options.map((o: any) => ({
              option_id: o.optionId,
              option_text: o.text,
            })),
          }));
  
          setQuestions(parsedQuestions);
        } else {
          console.error('Invalid data format:', data);
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, [jobId, userId]);
  

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId, 
    }));
  };
  
  
  

  const handleSubmit = async () => {
    if (!userId || !testId) {
      alert('User atau test ID tidak ditemukan.');
      return;
    }
  
    const answers = Object.entries(userAnswers).map(([questionId, selectedOption]) => {
      const validOption = selectedOption % 4 || 4; 
      return {
        questionId: parseInt(questionId, 10),
        selectedOption: validOption,
      };
    });
  
    try {
      const response = await fetch(`${base_url}/preselection/save-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          testId: testId, 
          answers,
        }),
      });
      if (response.ok) {
        alert('Test submitted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to submit test:', errorData);
        alert(errorData.msg || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Something went wrong, please try again.');
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

  if (questions.length === 0) {
    return (
      <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8 text-center">
        <Typography variant="h6">No questions available for this test.</Typography>
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
          Submit Test
        </Button>
      </div>
    </Container>
  );
};

export default PreSelectionTest;
