import { toast } from 'react-hot-toast';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse
} from '@/interfaces';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
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
      const errorData = response.data as ApiErrorResponse;

      switch (response.status) {
        case 401:
          // window.location.href = '/login';
          toast.error(errorData?.message || 'Phiên đăng nhập đã hết hạn');
          break;
        case 403:
          toast.error(
            errorData?.message ||
              'Bạn không có quyền truy cập vào tài nguyên này'
          );
          break;
        case 404:
          toast.error(
            errorData?.message || 'Không tìm thấy tài nguyên yêu cầu'
          );
          break;
        case 400:
          toast.error(errorData?.message || 'Dữ liệu không hợp lệ');
          break;
        default:
          toast.error('Có lỗi xảy ra. Vui lòng thử lại sau');
      }
    } else {
      toast.error('Không thể kết nối đến máy chủ');
    }

    return error && error.response && error.response.data
      ? Promise.reject(error.response.data)
      : Promise.reject(error);
  }
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
    url,
    config
  );
  return response.data;
};

export const getPaginated = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<PaginatedResponse<T>> => {
  const response: AxiosResponse<PaginatedResponse<T>> = await apiClient.get(
    url,
    config
  );
  return response.data;
};

export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
    url,
    data,
    config
  );
  return response.data;
};

export const postFormData = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const formData = new FormData();

  Object.entries(data as Record<string, any>).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value != null ? value.toString() : '');
    }
  });

  const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
    url,
    formData,
    {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {})
      }
    }
  );

  return response.data;
};

export const put = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
    url,
    data,
    config
  );
  return response.data;
};

export const patch = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(
    url,
    data,
    config
  );
  return response.data;
};

export const putFormData = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const formData = new FormData();

  Object.entries(data as Record<string, any>).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value != null ? value.toString() : '');
    }
  });

  const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
    url,
    formData,
    {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {})
      }
    }
  );

  return response.data;
};

export const patchFormData = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const formData = new FormData();

  Object.entries(data as Record<string, any>).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value != null ? value.toString() : '');
    }
  });

  const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(
    url,
    formData,
    {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {})
      }
    }
  );

  return response.data;
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(
    url,
    config
  );
  return response.data;
};

export default apiClient;
