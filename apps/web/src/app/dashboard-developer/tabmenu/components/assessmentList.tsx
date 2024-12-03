// components/assessmentList.tsx
import React, { useState } from 'react';
import { Assessment } from '@/types/assessment';

type AssessmentListProps = {
  assessments: Assessment[];
  onDelete: (id: number) => void;
  loading: boolean;
};

const AssessmentList: React.FC<AssessmentListProps> = ({ assessments, onDelete, loading }) => {
  const [expandedAssessmentId, setExpandedAssessmentId] = useState<number | null>(null);

  const toggleDetails = (id: number) => {
    setExpandedAssessmentId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Existing Assessments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {assessments.map((assessment) => (
            <li key={assessment.assessment_id} className="p-4 border rounded-lg bg-white shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    {assessment.assessment_data}
                  </h3>
                  <p className="text-sm text-gray-500">{assessment.questions?.length || 0} Questions</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleDetails(assessment.assessment_id)}
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    {expandedAssessmentId === assessment.assessment_id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => onDelete(assessment.assessment_id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {expandedAssessmentId === assessment.assessment_id && (
                <div className="mt-4 p-4 border-t">
                  <h4 className="text-md font-semibold mb-2">Questions</h4>
                  <ul className="space-y-4">
                    {assessment.questions?.map((question, qIndex) => (
                      <li key={qIndex} className="p-3 border rounded bg-gray-50">
                        <p className="font-medium">{question.question_text}</p>
                        <ul className="mt-2 space-y-1">
                          {question.answers.map((answer, aIndex) => (
                            <li
                              key={aIndex}
                              className={`${
                                answer.is_correct ? 'text-green-600' : 'text-gray-700'
                              }`}
                            >
                              {answer.is_correct && <strong>✓ </strong>}
                              {answer.answer_text}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssessmentList;
