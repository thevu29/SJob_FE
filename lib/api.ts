import { toast } from 'react-hot-toast';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
  ApiResponse,
  ApiErrorResponse,
  PaginatedResponse,
  IAuthResponse,
  IRefreshTokenData
} from '@/interfaces';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/constants';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/';

const api = axios.create({
  baseURL,
  timeout: 60000, // 60 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.config.headers = {
        ...promise.config.headers,
        Authorization: `Bearer ${token}`
      };
      promise.resolve(api(promise.config));
    }
  });
  failedQueue = [];
};

const handleBackToLogin = () => {
  deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
  deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
  window.location.href = '/login';
  toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
};

api.interceptors.request.use(
  (config) => {
    const token = getCookie(ACCESS_TOKEN_COOKIE_KEY);

    if (token && !config.isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error;

    if (!response) {
      toast.error('Không thể kết nối đến máy chủ');
      return Promise.reject(error);
    }

    if (
      response.status === 401 &&
      config &&
      !config.url?.includes('auth/refresh-token')
    ) {
      const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_KEY);

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshResponse = await post<
              IAuthResponse,
              IRefreshTokenData
            >(
              'auth/refresh-token',
              {
                refreshToken
              },
              {
                isPublic: true
              }
            );

            const { access_token, refresh_token: newRefreshToken } =
              refreshResponse.data;

            setCookie(ACCESS_TOKEN_COOKIE_KEY, access_token);

            if (newRefreshToken) {
              setCookie(REFRESH_TOKEN_COOKIE_KEY, newRefreshToken);
            }

            processQueue(null, access_token);
            return api(config);
          } catch (_refreshError) {
            processQueue(new Error('Refresh token failed'));
            handleBackToLogin();
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config });
          });
        }
      } else {
        handleBackToLogin();
      }
    }

    if (response) {
      const errorData = response.data as ApiErrorResponse;

      switch (response.status) {
        case 401:
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
  const response: AxiosResponse<ApiResponse<T>> = await api.get(url, config);
  return response.data;
};

export const getPublic = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => get<T>(url, { ...config, isPublic: true });

export const getPaginated = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<PaginatedResponse<T>> => {
  const response: AxiosResponse<PaginatedResponse<T>> = await api.get(
    url,
    config
  );
  return response.data;
};

export const getPaginatedPublic = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<PaginatedResponse<T>> =>
  getPaginated<T>(url, { ...config, isPublic: true });

export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.post(
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

  const response: AxiosResponse<ApiResponse<T>> = await api.post(
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
  const response: AxiosResponse<ApiResponse<T>> = await api.put(
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
  const response: AxiosResponse<ApiResponse<T>> = await api.patch(
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

  const response: AxiosResponse<ApiResponse<T>> = await api.put(url, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(config?.headers || {})
    }
  });

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

  const response: AxiosResponse<ApiResponse<T>> = await api.patch(
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
  const response: AxiosResponse<ApiResponse<T>> = await api.delete(url, config);
  return response.data;
};
