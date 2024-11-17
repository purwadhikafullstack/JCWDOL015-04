import React, { useState } from 'react';
import { Question } from '@/types/assessment';

type AssessmentCardProps = {
  questions: Question[];
  onSubmit: (responses: { question_id: number; answer_id: number; answer_text: string }[]) => void;
  loading: boolean;
};

const AssessmentCard: React.FC<AssessmentCardProps> = ({ questions, onSubmit, loading }) => {
  const [responses, setResponses] = useState<
    { question_id: number; answer_id: number; answer_text: string }[]
  >([]);

  const handleAnswer = (question_id: number, answer_id: number, answer_text: string) => {
    setResponses((prev) => [
      ...prev.filter((res) => res.question_id !== question_id),
      { question_id, answer_id, answer_text },
    ]);
  };

  const handleSubmit = () => {
    if (responses.length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    onSubmit(responses);
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.question_id} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{question.question_text}</h3>
          <ul>
            {question.answers.map((answer) => (
              <li key={answer.answer_id} className="mb-2">
                <label htmlFor={`answer_${answer.answer_id}`} className="flex items-center">
                  <input
                    id={`answer_${answer.answer_id}`}
                    type="radio"
                    name={`question_${question.question_id}`}
                    onChange={() =>
                      handleAnswer(question.question_id, answer.answer_id, answer.answer_text)
                    }
                    className="mr-2"
                  />
                  {answer.answer_text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default AssessmentCard;
