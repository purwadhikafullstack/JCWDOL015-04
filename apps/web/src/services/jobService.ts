import { Job } from '@/types/job';

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
  console.log(params.toString());
  const url = `http://localhost:8000/api/jobs?${params.toString()}`;
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
