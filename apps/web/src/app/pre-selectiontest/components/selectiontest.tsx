'use client'

import React from 'react';
import {
  Container,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button
} from '@mui/material';

const questions = Array.from({ length: 25 }, (_, i) => ({
  question: `Pertanyaan ${i + 1}: Ini adalah pertanyaan contoh untuk testing`,
  options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
  correctAnswer: "Pilihan A"
}));

const PreSelectionTest: React.FC = () => {
  const handleSubmit = () => {
    alert("Mohon tunggu pemberitahuan selanjutnya");
  };

  return (
    <Container maxWidth="md" className="bg-white p-6 rounded-lg shadow-md my-8">
      <Typography variant="h4" align="center" gutterBottom>
        Pre-Selection Test
      </Typography>
      
      {questions.map((q, index) => (
        <div key={index} className="mb-6 p-4 border rounded-md bg-gray-100">
          <Typography variant="h6" gutterBottom>
            {index + 1}. {q.question}
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup name={`question${index}`}>
              {q.options.map((option, optIndex) => (
                <FormControlLabel
                  key={optIndex}
                  value={option}
                  control={<Radio color="primary" />}
                  label={option}
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
