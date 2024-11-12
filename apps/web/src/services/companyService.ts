import { fetchCompanies } from '@/lib/company';
import { Company } from '@/types/company';
import base_url from '../lib/user';
import { getToken } from '@/lib/server';


export const getFilteredCompanies = async (filters: {
  search?: string;
  industry?: string[];
  country?: string;
}): Promise<Company[]> => {
  const queryParams = new URLSearchParams();
  const token = await getToken();

  if (filters.search) queryParams.set('search', filters.search);
  if (filters.industry) {
    filters.industry.forEach((ind) => queryParams.append('industry', ind));
  }
  if (filters.country) queryParams.set('country', filters.country);

  try {
    const response = await fetch(`${base_url}/companies/search?${queryParams.toString()}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.companies;
  } catch (error) {
    console.error('Error fetching filtered companies:', error);
    return [];
  }
};

