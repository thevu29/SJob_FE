import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    isPublic?: boolean;
  }
}
