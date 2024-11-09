// /src/services/companyService.ts
import { fetchCompanies } from '@/lib/company';
import { Company } from '@/types/company';
import base_url from '../lib/user';


export const getFilteredCompanies = async (filters: {
  search: string;
  industry?: string[];
  country?: string;
}): Promise<Company[]> => {
  console.log('Filters:', filters);
  const queryParams = new URLSearchParams(filters as any).toString();

  try {
    const response = await fetch(`${base_url}/companies/search?${queryParams}`);
    const data = await response.json();
    return data.companies;
  } catch (error) {
    console.error('Error fetching filtered companies:', error);
    return [];
  }
};