export interface IUserReg {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
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
  application_id: string;
  role: string;
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

