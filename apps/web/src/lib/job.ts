// src/lib/job.ts
const base_url = process.env.BASE_URL_API || "http://localhost:8000/api";

// Function to get all jobs with optional filters
export const getJobs = async (filters: { search?: string; location?: string; country?: string; category?: string; dateRange?: string } = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.set("search", filters.search);
    if (filters.category) queryParams.set("category", filters.category);
    if (filters.country) queryParams.set("country", filters.country);
    if (filters.location) queryParams.set("location", filters.location);
    if (filters.dateRange) queryParams.set("dateRange", filters.dateRange);

    try {
        const res = await fetch(`${base_url}/jobs?${queryParams.toString()}`, { cache: 'no-cache' });
        const result = await res.json();
        return { jobs: result.jobs, ok: res.ok };
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { jobs: [], ok: false };
    }
};

// Function to get a single job by ID
export const getJobById = async (jobId: string) => {
    try {
        const res = await fetch(`${base_url}/jobs/${jobId}`, { cache: 'no-cache' });
        const result = await res.json();
        return { job: result.job, ok: res.ok };
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return { job: null, ok: false };
    }
};
