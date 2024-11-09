// /src/types/company.ts

// Interface for jobs associated with a company, with relevant details
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



// Main company interface to include detailed information for individual pages
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
  yearOfEstablish?: Date;
  IndustryType?: string;
  TeamSize?: number;
  country: string;
  address?: string;
  description?: string;
  logo?: string;
  banner?: string;
  created_at: Date;
  updated_at: Date;

  // Relations
  jobs?: CompanyJob[]; 
  reviews?: CompanyReview[];
}

// Interface for filters applied in the company search/filter component
export interface CompanyFilterBarProps {
  onSearch: (filters: { search: string; country: string; industry?: string[]; year?: number | null }) => void;
}


// Interface for a favorite or followed company
export interface FavoriteCompany {
  id: number;
  company: {
    company_id: number;
    company_name: string;
    logo?: string;
  };
  created_at: string;
}

// Optional: Interface for a company review, if reviews are part of the company data
export interface CompanyReview {
  review_id: number;
  rating: number;
  comment: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
