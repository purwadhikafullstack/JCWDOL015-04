export interface IAssessment {
  assessment_id: number;
  badge: string | null;
  score: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  assessment_data: string;
  assessment_date: string | null;
  feedback: string | null;
  user_id: number;
  questions: {
    question_id: number;
    question_text: string;
    question_type: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    difficulty_level: string | null;
    points: number | null;
    answers: {
      answer_id: number;
      answer_text: string;
      is_correct: boolean | null;
      created_at: string;
      updated_at: string;
    }[];
  }[];
}

export type Answer = {
  answer_id: number;
  answer_text: string;
  is_correct: boolean;
};

export type Question = {
  question_id: number;
  question_text: string;
  answers: Answer[];
};

export type Assessment = {
  assessment_id: number;
  assessment_data: string;
  score: number;
  status: string;
  user_id: number;
  questions?: Question[];
};

export interface UserAssessmentScore {
  score_id: number;
  badge: string;
  score: number;
  status: string;
  unique_code: string;
  created_at: string; 
  assessment_data: string; 
}
