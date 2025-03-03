import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { fetchApi } from "../api";

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
  endpoint: string,
  queryKey: string[],
  options?: UseQueryOptions<T, Error, T, string[]>
) {
  return useQuery({
    queryKey,
    queryFn: () => fetchApi<T>(endpoint),
    ...options,
  });
}

export function useGetPaginated<T>(
  endpoint: string,
  page: number,
  pageSize: number,
  queryKey: string[],
  options?: UseQueryOptions<
    PaginatedResponse<T>,
    Error,
    PaginatedResponse<T>,
    string[]
  >
) {
  const queryUrl = `${endpoint}?page=${page}&limit=${pageSize}`;

  return useQuery({
    queryKey: [...queryKey, page.toString(), pageSize.toString()],
    queryFn: () => fetchApi<PaginatedResponse<T>>(queryUrl),
    staleTime: 5000,
    ...options,
  });
}

export function usePost<T, R = T>(
  endpoint: string,
  options?: UseMutationOptions<R, Error, T, unknown>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) =>
      fetchApi<R>(endpoint, { method: "POST", body: data }),
    onSuccess: () => {
      // customize this to invalidate specific queries
      queryClient.invalidateQueries();
    },
    ...options,
  });
}
export function usePut<T, R = T>(
  endpoint: string,
  options?: UseMutationOptions<R, Error, T, unknown>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) =>
      fetchApi<R>(endpoint, { method: "PUT", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

export function useDelete<T = void>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, string, unknown>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchApi<T>(`${endpoint}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}
