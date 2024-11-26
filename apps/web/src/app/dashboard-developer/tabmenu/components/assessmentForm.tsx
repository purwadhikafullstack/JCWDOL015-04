
import React, { useState } from 'react';

type AssessmentFormProps = {
  onCreate: (data: any) => Promise<void>;
  loading: boolean;
};

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onCreate, loading }) => {
  const [data, setData] = useState({
    assessment_data: '',
    questions: [{ question_text: '', answers: [{ answer_text: '', is_correct: false }] }],
  });

  const addQuestion = () => {
    setData((prev) => ({
      ...prev,
      questions: [...prev.questions, { question_text: '', answers: [{ answer_text: '', is_correct: false }] }],
    }));
  };

  const addAnswer = (index: number) => {
    const updatedQuestions = [...data.questions];
    updatedQuestions[index].answers.push({ answer_text: '', is_correct: false });
    setData({ ...data, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    await onCreate(data);
    setData({
      assessment_data: '',
      questions: [{ question_text: '', answers: [{ answer_text: '', is_correct: false }] }],
    });
  };

  return (
    <div className="mb-8 border p-6 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New Assessment</h2>
      <textarea
        className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Assessment description"
        value={data.assessment_data}
        onChange={(e) => setData({ ...data, assessment_data: e.target.value })}
      />
      {data.questions.map((q, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <input
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Question ${index + 1}`}
            value={q.question_text}
            onChange={(e) => {
              const updatedQuestions = [...data.questions];
              updatedQuestions[index].question_text = e.target.value;
              setData({ ...data, questions: updatedQuestions });
            }}
          />
          {q.answers.map((a, aIndex) => (
            <div key={aIndex} className="flex items-center mb-4">
              <input
                className="w-full border p-3 mr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Answer ${aIndex + 1}`}
                value={a.answer_text}
                onChange={(e) => {
                  const updatedQuestions = [...data.questions];
                  updatedQuestions[index].answers[aIndex].answer_text = e.target.value;
                  setData({ ...data, questions: updatedQuestions });
                }}
              />
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 focus:ring-2 focus:ring-blue-500"
                  checked={a.is_correct}
                  onChange={(e) => {
                    const updatedQuestions = [...data.questions];
                    updatedQuestions[index].answers[aIndex].is_correct = e.target.checked;
                    setData({ ...data, questions: updatedQuestions });
                  }}
                />
                Correct
              </label>
            </div>
          ))}
          <button
            onClick={() => addAnswer(index)}
            className="text-blue-600 underline text-sm hover:text-blue-800"
          >
            + Add Answer
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="w-full bg-gray-100 text-blue-700 px-4 py-2 rounded-lg border border-blue-500 mb-6 hover:bg-blue-500 hover:text-white transition"
      >
        + Add Question
      </button>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Assessment'}
      </button>
    </div>
  );
};

export default AssessmentForm;
