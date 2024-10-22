// Enum to represent the different roles a user can have
export enum UserRole {
    Normal = 'normal',
    Candidate = 'candidate',
    Admin = 'admin',
    Developer = 'developer',
  }
  
  // Interface to define the shape of a user object
  export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture: string;

  }
  