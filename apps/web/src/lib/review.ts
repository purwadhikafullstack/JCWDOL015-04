// src/lib/api.ts

import {
  CreateReviewPayload,
  UpdateReviewPayload,
  IReview,
  IAverageCompanyReview,
} from '@/types/review';
import { getToken } from './server';

const base_url = process.env.NEXT_PUBLIC_BASE_API_URL

export const fetchReviewsByCompany = async (
  companyId: number,
): Promise<IReview[]> => {
  const response = await fetch(`${base_url}/review/${companyId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error fetching reviews for company ID: ${companyId}`);
  }

  return response.json();
};

export const AverageCompanyReview = async (
  companyId: number,
): Promise<IAverageCompanyReview> => {
  const response = await fetch(
    `${base_url}/review/${companyId}/average-rating`,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching average reviews for company ID: ${companyId}`,
    );
  }

  return response.json();
};

export const createReview = async (
  payload: CreateReviewPayload,
): Promise<IReview> => {
  const token = await getToken();
  console.log('Token:', token);

  const response = await fetch(`${base_url}/review/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json(); // Ambil pesan dari respons backend

  if (!response.ok) {
    console.error('Error response from backend:', responseData.message); // Tampilkan pesan error
    throw new Error(responseData.message || 'Error creating review');
  }

  return responseData.review; // Return data review
};

