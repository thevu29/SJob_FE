import { JwtPayload } from 'jwt-decode';

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IGoogleLoginData {
  code: string;
}

export interface ICustomJwtPayload extends JwtPayload {
  email: string;
  realm_access: {
    roles: string[];
  };
}

export interface IRefreshTokenData {
  refreshToken: string;
}

export interface IJobSeekerSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface IRecruiterSignUpData extends IJobSeekerSignUpData {
  address: string;
  fieldId: string;
  phone: string;
  website?: string;
}

export interface ISendOtpData {
  email: string;
}

export interface IVerifyOtpData {
  email: string;
  otp: string;
}

export interface IResetPasswordData {
  email: string;
  password: string;
}
