import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import {
  get,
  post,
  del,
  put,
  getPaginated,
  putFormData,
  patch,
  patchFormData,
  postFormData,
  getPublic,
  getPaginatedPublic
} from '@/lib/api';
import type { ApiResponse, PaginatedResponse } from '@/interfaces';

export function useGet<T>(
  url: string,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: Partial<
    UseQueryOptions<ApiResponse<T>, AxiosError, ApiResponse<T>, string[]>
  >
) {
  return useQuery({
    queryKey,
    queryFn: () => get<T>(url, config),
    ...(options || {})
  });
}

export function useGetPublic<T>(
  url: string,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: Partial<
    UseQueryOptions<ApiResponse<T>, AxiosError, ApiResponse<T>, string[]>
  >
) {
  return useQuery({
    queryKey,
    queryFn: () => getPublic<T>(url, config),
    ...(options || {})
  });
}

export function useGetPaginated<T>(
  url: string,
  page: number,
  pageSize: number,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: Partial<
    UseQueryOptions<
      PaginatedResponse<T>,
      AxiosError,
      PaginatedResponse<T>,
      string[]
    >
  >
) {
  const queryUrl = `${url}?page=${page}&limit=${pageSize}`;

  const params = config?.params || {};
  const paramValues = Object.values(params)
    .filter(value => value !== undefined && value !== '')
    .map(value => String(value));

  return useQuery({
    queryKey: [...queryKey, page.toString(), pageSize.toString(), ...paramValues],
    queryFn: () => getPaginated<T>(queryUrl, config),
    staleTime: 1000 * 60 * 5,
    ...options
  });
}

export function useGetPaginatedPublic<T>(
  url: string,
  page: number,
  pageSize: number,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: Partial<
    UseQueryOptions<
      PaginatedResponse<T>,
      AxiosError,
      PaginatedResponse<T>,
      string[]
    >
  >
) {
  const queryUrl = `${url}?page=${page}&limit=${pageSize}`;

  const params = config?.params || {};
  const paramValues = Object.values(params)
    .filter(value => value !== undefined && value !== '')
    .map(value => String(value));

  return useQuery({
    queryKey: [...queryKey, page.toString(), pageSize.toString(), ...paramValues],
    queryFn: () => getPaginatedPublic<T>(queryUrl, config),
    staleTime: 1000 * 60 * 5,
    ...options
  });
}

export function usePost<T, D = unknown>(
  url: string,
  options?: UseMutationOptions<ApiResponse<T>, AxiosError, D, unknown>,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (data: D) => post<T, D>(url, data, config),
    onSuccess: async (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function usePostFormData<T, D = unknown>(
  url: string,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<T>,
      AxiosError,
      D & { id: string | number },
      unknown
    >
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation<
    ApiResponse<T>,
    AxiosError,
    D & { id: string | number },
    unknown
  >({
    mutationFn: (data) => {
      return postFormData<T, D>(url, data, config);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function usePut<T, D = unknown>(
  url: string,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<T>,
      AxiosError,
      D & { id: string | number },
      unknown
    >
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (data: D & { id: string | number }) => {
      const { id, ...rest } = data;
      return put<T, D>(`${url}/${id}`, rest as D, config);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function usePatch<T, D = unknown>(
  url: string,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<T>,
      AxiosError,
      D & { id: string | number },
      unknown
    >
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (data: D & { id: string | number }) => {
      const { id, ...rest } = data;
      return patch<T, D>(`${url}/${id}`, rest as D, config);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function usePutFormData<T, D = unknown>(
  url: string,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<T>,
      AxiosError,
      D & { id: string | number },
      unknown
    >
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation<
    ApiResponse<T>,
    AxiosError,
    D & { id: string | number },
    unknown
  >({
    mutationFn: (data) => {
      const { id, ...rest } = data;
      return putFormData<T, D>(`${url}/${id}`, rest as D, config);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function usePatchFormData<T, D = unknown>(
  url: string,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<T>,
      AxiosError,
      D & { id: string | number },
      unknown
    >
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation<
    ApiResponse<T>,
    AxiosError,
    D & { id: string | number },
    unknown
  >({
    mutationFn: (data) => {
      const { id, ...rest } = data;
      return patchFormData<T, D>(`${url}/${id}`, rest as D, config);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}

export function useDelete<T = void>(
  url: string,
  options?: Partial<
    UseMutationOptions<ApiResponse<T>, AxiosError, string | number, unknown>
  >,
  queryKeys?: string[],
  config?: AxiosRequestConfig
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (id: string | number) => del<T>(`${url}/${id}`, config),
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      }

      if (userOnSuccess) {
        userOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (userOnError) {
        userOnError(error, variables, context);
      }
    },
    ...restOptions
  });
}
