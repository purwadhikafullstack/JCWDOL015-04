export interface Company {
  company_id: number;
  company_name: string;
  email: string;
  phone?: string;
  aboutUs?: string;
  yearOfEstablish?: Date;
  IndustryType?: string;
  TeamSize?: number;
  country: string;
  address?: string;
  website?: string;
  created_at: Date;
  updated_at: Date;
  description?: string;
  logo?: string;
  banner?: string;
}

export interface Job {
  job_id: number;
  job_title: string;
  description: string;
  responsibility: string;
  location: string;
  country: string;
  salary?: number;
  is_active: boolean;
  jobCategory: string;
  jobType: string;
  jobEducationLevel: string;
  jobExperience: string;
  created_at: Date;
  updated_at: Date;
  company: Company;
}

export interface JobFilterBarProps {
  onSearch: (filters: {
    search: string;
    country: string;
    jobType: string[]; 
    salary: string[]; 
    jobCategory: string[]; 
    jobEducationLevel: string[]; 
    jobExperience: string[];
  }) => void;
  manualLocation: boolean;
}

export interface JobCardProps {
  job_id: number;
  job_title: string;
  location: string;
  salary: string | null;
  company: {
    company_name: string;
    logo: string | null;
  };
}
