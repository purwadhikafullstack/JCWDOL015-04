// /src/lib/company.ts
import { Company } from '@/types/company';
import { Job } from '@/types/job';
import base_url from './user';
import { getToken } from './server';
import { jwtDecode } from 'jwt-decode';

export const fetchCompanies = async (
  filters: {
    search?: string;
    industry?: string | string[];
    country?: string;
    dateRange?: string;
  } = {},
) => {
  const queryParams = new URLSearchParams();

  if (filters.search) queryParams.set('search', filters.search);
  if (filters.industry) {
    if (Array.isArray(filters.industry)) {
      filters.industry.forEach((ind) => queryParams.append('industry', ind));
    } else {
      queryParams.set('industry', filters.industry);
    }
  }
  if (filters.country) queryParams.set('country', filters.country);
  if (filters.dateRange) queryParams.set('dateRange', filters.dateRange);

  const response = await fetch(
    `${base_url}/companies?${queryParams.toString()}`,
  );
  const data = await response.json();


  return data.companies || [];
};

export const getCompanyById = async (
  companyId: string,
): Promise<{ company: Company | null; ok: boolean }> => {
  try {
    const res = await fetch(`${base_url}/companies/${companyId}`, {
      cache: 'no-cache',
    });
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

export const getJobsByCompanyId = async (
  companyId: number,
): Promise<{ jobs: Job[]; ok: boolean }> => {
  try {
    const res = await fetch(`${base_url}/jobs/company/${companyId}`);
    const result = await res.json();
    return { jobs: result.jobs, ok: res.ok };
  } catch (error) {
    console.error('Error fetching jobs for company:', error);
    return { jobs: [], ok: false };
  }
};

export const fetchUserCompany = async (): Promise<{ company: Company | null; ok: boolean }> => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return { company: null, ok: false };
  }

  const decoded: any = jwtDecode(token);
  const userId = decoded?.user_id;

  if (!userId) {
    console.error('Invalid token: user ID not found');
    return { company: null, ok: false };
  }

  try {
    const res = await fetch(`${base_url}/companies/user?id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user’s company');
    }

    const result = await res.json();
    return { company: result.company, ok: true };
  } catch (error) {
    console.error('Error fetching user’s company:', error);
    return { company: null, ok: false };
  }
};

