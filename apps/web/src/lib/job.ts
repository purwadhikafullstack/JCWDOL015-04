import { FavoriteJob, Job } from '@/types/job';
import { getToken } from './server';

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

// Function to get all jobs with optional filters
export const getJobs = async (
  filters: {
    search?: string;
    location?: string;
    country?: string;
    jobType?: string;
    salary?: string;
    jobCategory?: string;
    jobExpired_at?: string;
    jobEducationLevel?: string;
    jobExperience?: string;
    dateRange?: string;
  } = {},
) => {
  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.set('search', filters.search);
  if (filters.jobType) queryParams.set('jobType', filters.jobType);
  if (filters.salary) queryParams.set('salary', filters.salary);
  if (filters.jobCategory) queryParams.set('jobCategory', filters.jobCategory);
  if (filters.jobEducationLevel)
    queryParams.set('jobEducationLevel', filters.jobEducationLevel);
  if (filters.jobExperience)
    queryParams.set('jobExperience', filters.jobExperience);
  if (filters.country) queryParams.set('country', filters.country);
  if (filters.location) queryParams.set('location', filters.location);
  if (filters.dateRange) queryParams.set('dateRange', filters.dateRange);

  try {
    const res = await fetch(`${base_url}/jobs?${queryParams.toString()}`, {
      cache: 'no-cache',
    });
    const result = await res.json();
    return { jobs: result.jobs, ok: res.ok };
  } catch (error) {
    return { jobs: [], ok: false };
  }
};

// Function to get a single job by ID
export const getJobById = async (
  jobId: string,
): Promise<{ job: Job | null; ok: boolean }> => {
  try {
    const res = await fetch(`${base_url}/jobs/${jobId}`, { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Failed to fetch job with ID: ${jobId}`);
    }
    const result = await res.json();
    return { job: result.job, ok: true };
  } catch (error) {
    return { job: null, ok: false };
  }
};

export const toggleSaveJob = async (jobId: number) => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return { msg: 'Unauthorized', ok: false };
  }

  try {
    const res = await fetch(`${base_url}/jobs/favorites/toggle`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    });

    const result = await res.json();
    return { result, ok: res.ok };
  } catch (error) {
    console.error('Error in toggleSaveJob:', error);
    return { msg: 'Failed to toggle favorite job', ok: false };
  }
};

export const fetchFavoriteJobs = async (
  userId: number,
): Promise<FavoriteJob[]> => {
  const token = await getToken();
  if (!token) {
    console.error('No token found');
    return [];
  }

  try {
    const response = await fetch(`${base_url}/favorite-job?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.favorites as FavoriteJob[];
    } else {
      console.error(data.msg || 'Failed to fetch favorite jobs');
      return [];
    }
  } catch (error) {
    console.error('Error fetching favorite jobs:', error);
    return [];
  }
};
