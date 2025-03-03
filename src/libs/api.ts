import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  [key: string]: unknown;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('auth-token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 401:
          // window.location.href = '/login';
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('The requested resource was not found');
          break;
        case 500:
          toast.error('An error occurred on the server');
          break;
        default:
          const errorData = response.data as ApiErrorResponse;
          const message = errorData?.message || 'Something went wrong. Please try again.';
          toast.error(message);
      }
    } else {
      toast.error('Network error. Please check your connection');
    }
    
    return Promise.reject(error);
  }
);

export const get = async <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, config);
  return response.data;
};

export const post = async <T, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data, config);
  return response.data;
};

export const put = async <T, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data, config);
  return response.data;
};

export const del = async <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;