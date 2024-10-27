import { Job } from '@/types/job';

export const fetchJobs = async (
  sortOrder: string,
  filters: Record<string, string | string[]> = {},
): Promise<Job[]> => {
  const params = new URLSearchParams();

  // Append sorting order
  if (sortOrder) {
    params.append('dateRange', sortOrder);
  }

  // Append filters, handling arrays correctly
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      // For array filters, add each item as a separate query parameter
      value.forEach((val) => params.append(key, val));
    } else if (value) {
      // For single values, add directly
      params.append(key, value);
    }
  }

  // Construct the full URL
  const url = `http://localhost:8000/api/jobs?${params.toString()}`;
  console.log("Constructed URL:", url); // Debugging log for full request URL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched jobs data:", data.jobs); // Log response data
    return data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
