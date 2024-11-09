// /src/lib/company.ts
import { Company } from '@/types/company';
import { Job } from '@/types/job';
import base_url from './user';


export const fetchCompanies = async (filters : { 
    search?: string;
    industry?: string | string[];
    country?: string;
    dateRange?: string;
 } = {}) => {
    const queryParams = new URLSearchParams();

    // Append filters to query params if they exist
    if (filters.search) queryParams.set('search', filters.search);
    if (filters.industry) {
        if (Array.isArray(filters.industry)) {
            filters.industry.forEach(ind => queryParams.append('industry', ind));
        } else {
            queryParams.set('industry', filters.industry);
        }
    }
    if (filters.country) queryParams.set('country', filters.country);
    if (filters.dateRange) queryParams.set('dateRange', filters.dateRange);
    // Add any other filters you need

    const response = await fetch(`${base_url}/companies?${queryParams.toString()}`);
    const data = await response.json();

    // Check if data has companies and return it safely
    return data.companies || []; // Ensure it returns an array
};

export const getCompanyById = async (companyId: string): Promise<{ company: Company | null; ok: boolean }> => {
  try {
    const res = await fetch(`${base_url}/companies/${companyId}`, { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Failed to fetch company with ID: ${companyId}`);
    }
    const result = await res.json();
    return { company: result.company, ok: true };
  } catch (error) {
    console.error('Error fetching company:', error);
    return { company: null, ok: false };
  }
};

export const getJobsByCompanyId = async (companyId: number): Promise<{ jobs: Job[]; ok: boolean }> => {
    try {
      const res = await fetch(`${base_url}/jobs/company/${companyId}`);
      const result = await res.json();
      return { jobs: result.jobs, ok: res.ok };
    } catch (error) {
      console.error('Error fetching jobs for company:', error);
      return { jobs: [], ok: false };
    }
  };
  
  
