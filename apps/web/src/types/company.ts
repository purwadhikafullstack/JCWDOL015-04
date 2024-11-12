export interface CompanyJob {
  job_id: number;
  job_title: string;
  location: string;
  salary?: number;
  is_active: boolean;
  jobCategory: string;
  jobType: string;
  jobEducationLevel: string;
  jobExperience: string;
  jobExpired_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyCardProps {
  company_id: number;
  company_name: string;
  country: string;
  logo: string | null;
  IndustryType?: string;
}

export interface Company {
  company_id: number;
  company_name: string;
  email: string;
  phone?: string;
  aboutUs?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  yearOfEstablish?: string;
  IndustryType?: string;
  TeamSize?: string;
  country: string;
  address?: string;
  description?: string;
  logo?: string;
  banner?: string;
  created_at: Date;
  updated_at: Date;

  jobs?: CompanyJob[]; 
  reviews?: CompanyReview[];
}

export interface CompanyFilterBarProps {
  onSearch: (filters: { search: string; country: string; industry?: string[]; year?: number | null }) => void;
}

export interface FavoriteCompany {
  id: number;
  company: {
    company_id: number;
    company_name: string;
    logo?: string;
  };
  created_at: string;
}

export interface CompanyReview {
  review_id: number;
  rating: number;
  comment: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
