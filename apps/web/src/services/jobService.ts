import { Job } from '@/types/job';
import base_url from '../lib/user';

export const fetchJobs = async (
  sortOrder: string,
  filters: Record<string, string | string[]> = {},
): Promise<Job[]> => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val));
    } else if (value) {
      params.append(key, value);
    }
  }
  const url = `${base_url}/jobs?${params.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.jobs;
  } catch (error) {
    return [];
  }
};
