import { Job } from "@/types/job";

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
export const getJobById = async (jobId: string): Promise<{ job: Job | null; ok: boolean }> => {
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