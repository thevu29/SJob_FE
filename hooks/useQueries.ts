import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import type { ApiResponse, PaginatedResponse } from '@/interfaces';
import { get, post, put, del, getPaginated } from '@/lib/api';

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

  return useQuery({
    queryKey: [...queryKey, page.toString(), pageSize.toString()],
    queryFn: () => getPaginated<T>(queryUrl, config),
    staleTime: 1000 * 60 * 5,
    ...options
  });
}

export function usePost<T, D = unknown>(
  url: string,
  options?: UseMutationOptions<ApiResponse<T>, AxiosError, D, unknown>,
  queryKeys?: string[]
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (data: D) => post<T, D>(url, data),
    onSuccess: async (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [url] });
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
  queryKeys?: string[]
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
      return put<T, D>(`${url}/${id}`, rest as D);
    },
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [url] });
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
  queryKeys?: string[]
) {
  const queryClient = useQueryClient();

  const userOnSuccess = options?.onSuccess;
  const userOnError = options?.onError;

  const restOptions = { ...options };
  delete restOptions.onSuccess;
  delete restOptions.onError;

  return useMutation({
    mutationFn: (id: string | number) => del<T>(`${url}/${id}`),
    onSuccess: (data, variables, context) => {
      if (queryKeys && queryKeys.length > 0) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: typeof key === 'string' ? [key] : key
          });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [url] });
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
