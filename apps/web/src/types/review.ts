// src/types/review.ts

export interface IReview {
  review_id: number;
  rating: number;
  comment?: string;
  salary_estimate?: number;
  position?: string;
  workCultureRating?: number;
  workLifeBalanceRating?: number;
  facilitiesRating?: number;
  careerOpportunitiesRating?: number;
  company_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewPayload {
  comment: string;
  salary_estimate: number;
  position: string;
  workCultureRating: number;
  workLifeBalanceRating: number;
  facilitiesRating: number;
  careerOpportunitiesRating: number;
  company_id: number;
}

export interface UpdateReviewPayload extends CreateReviewPayload {
  review_id: number;
}

export interface IAverageCompanyReview {
    rating: number;
}