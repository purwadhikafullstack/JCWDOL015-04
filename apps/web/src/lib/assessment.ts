import { Assessment } from '@/types/assessment';
import { getToken } from './server';

const base_url = process.env.BASE_API_URL

export async function fetchAllAssessments(): Promise<Assessment[]> {
    const token = await getToken(); // Replace with your token retrieval logic
    if (!token) {
      throw new Error('Failed to retrieve authentication token');
    }
  
    const response = await fetch(`${base_url}/assessment/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch assessments');
    }
  
    const data = await response.json();
    return data.assessments.map((assessment: any) => ({
      ...assessment,
      questions: assessment.questions?.map((question: any) => ({
        ...question,
        answers: question.answers || [],
      })),
    }));
  }
  
  export async function fetchCreateAssessment(data: any): Promise<void> {
    const token = await getToken();
    if (!token) {
      throw new Error('Failed to retrieve authentication token');
    }
  
    const response = await fetch(`${base_url}/assessment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create assessment');
    }
  }
  
  export async function fetchDeleteAssessment(id: number): Promise<void> {
    const token = await getToken();
    if (!token) {
      throw new Error('Failed to retrieve authentication token');
    }
  
    const response = await fetch(`${base_url}/assessment/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete assessment');
    }
  }

/**
 * Fetch to get user-specific assessments
 * @param {number} userId - The ID of the user
 */
export async function fetchUserAssessments(userId: number): Promise<any> {
  const token = await getToken();
  if (!token) {
    throw new Error('Failed to retrieve authentication token');
  }

  const response = await fetch(`${base_url}/assessment/user/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user assessments');
  }

  return await response.json();
}

export async function fetchStartAssessment(assessmentId: number): Promise<any> {
  const token = await getToken(); // Pastikan ini mengambil token pengguna
  if (!token) {
    throw new Error('Failed to retrieve authentication token');
  }

  const response = await fetch(`${base_url}/assessment/start/${assessmentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to start assessment');
  }

  return await response.json();
}

/**
 * Fetch to submit an assessment
 * @param {Object} data - The submission data
 */
export async function fetchSubmitAssessment(data: { responses: any[] }): Promise<any> {
  const token = localStorage.getItem('assessmentToken'); // Ambil token dari storage
  if (!token) {
    throw new Error('Missing assessment token');
  }

  const response = await fetch(`${base_url}/assessment/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // Kirim data dengan format JSON
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to submit assessment');
  }

  return await response.json(); // Parse JSON response
}


export async function fetchAssessmentToken(assessmentId: number): Promise<string> {
  const userToken = await getToken(); // Ambil token autentikasi pengguna
  if (!userToken) {
    throw new Error('Authentication token is missing.');
  }

  const response = await fetch(`${base_url}/assessment/start/${assessmentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch assessment token.');
  }

  const data = await response.json();
  return data.token; // Token assessment
}