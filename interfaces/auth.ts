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

export interface ICustomJwtPayload extends JwtPayload {
  email: string;
  realm_access: {
    roles: string[];
  };
}

export interface IRefreshTokenData {
  refreshToken: string;
}
