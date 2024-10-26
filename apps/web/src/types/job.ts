export interface Company {
    company_id: number;
    company_name: string;
    IndustryType?: string;
    address?: string;
  }
  
  export interface Job {
    job_id: number;
    job_title: string;
    description: string;
    location: string;
    country: string;
    salary?: number;
    is_active: boolean;
    category: string;
    company: {
        company_name: string;
        logo?: string;
        IndustryType?: string;
        address?: string;
  }
}