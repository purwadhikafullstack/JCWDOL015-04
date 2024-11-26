export interface Cv {
    cv_id: number;
    user_id: number;
    template: string;
    content: ResumeContent;
    created_at: string;
    updated_at: string;
  }
  

  export interface ResumeContent {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    experiences: { company: string; position: string; years: number; responsibilities: string }[];
    skills: string[];
    education: { institution: string; degree: string; year: number }[];
  }
  