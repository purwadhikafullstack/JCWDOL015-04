export interface Cv {
    cv_id: number;
    user_id: number;
    template: string;
    content: CvContent;
    created_at: string;
    updated_at: string;
  }
  
  export interface CvContent {
    fullName: string;
    summary: string;
    experiences?: { company: string; position: string; years: number }[];
    skills?: string[];
  }

  export interface ResumeContent {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    experiences: { company: string; position: string; years: number }[];
    skills: string[];
    education: { institution: string; degree: string; year: number }[];
  }
  