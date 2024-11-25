import { UserRole, EducationLevel, Gender } from '@/types/role';

export interface IUserReg {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  company_name?: string;
  company_email?: string;
  country?: string;
}


export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserVerify {
  email: string;
  is_verified: boolean;
}

export interface DecodedToken {
  user_id: string;
  userProfile: IUserProfile;
}

export interface JwtPayload {
  id: string;
}

export interface IUserState {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  role: string;
}

export interface IUserProfile {
  user_id: number;
  email: string;
  password: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  title?: string;
  education?: EducationLevel;
  biography?: string;
  location?: string;
  skills?: string;
  languages?: string;
  nationality?: string;
  gender?: Gender;
  tempat_lahir?: string;
  DateOfBirth?: Date;
  resume?: string;
  years_of_experience?: number;
  created_at: Date;
  updated_at: Date;
  is_verified: boolean;
}