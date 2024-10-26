// services/jobService.ts
import { Job } from '@/types/job';

export const fetchJobs = async (sortOrder: string, filters = {}): Promise<Job[]> => {
    const params = new URLSearchParams({
        ...filters,
        dateRange: sortOrder,
    });
    const response = await fetch(`http://localhost:8000/api/jobs?${params.toString()}`);
    const data = await response.json();
    return data.jobs;
};
