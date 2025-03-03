import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from 'axios';
import { get, post, put, del } from '../lib/api';

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export function useGet<T>(
  url: string,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: UseQueryOptions<T, AxiosError, T, string[]>
) {
  return useQuery({
    queryKey,
    queryFn: () => get<T>(url, config),
    ...options,
  });
}

export function useGetPaginated<T>(
  url: string,
  page: number,
  pageSize: number,
  queryKey: string[],
  config?: AxiosRequestConfig,
  options?: UseQueryOptions<PaginatedResponse<T>, AxiosError, PaginatedResponse<T>, string[]>
) {
  const queryUrl = `${url}?page=${page}&limit=${pageSize}`;
  
  return useQuery({
    queryKey: [...queryKey, page.toString(), pageSize.toString()],
    queryFn: () => get<PaginatedResponse<T>>(queryUrl, config),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

export function usePost<T, D = unknown>(
  url: string,
  options?: UseMutationOptions<T, AxiosError, D, unknown>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: D) => post<T, D>(url, data),
    onSuccess: () => {
      // Invalidate related queries on success
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

export function usePut<T, D = unknown>(
  url: string,
  options?: UseMutationOptions<T, AxiosError, D & { id: string | number }, unknown>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: D & { id: string | number }) => {
      const { id, ...rest } = data;
      return put<T, D>(`${url}/${id}`, rest as D);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

export function useDelete<T = void>(
  url: string,
  options?: UseMutationOptions<T, AxiosError, string | number, unknown>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => del<T>(`${url}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}
