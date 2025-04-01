export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
  data: T;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  status?: number;
  timestamp?: string;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
  data: T[];
  meta: {
    page: number;
    totalPages: number;
    totalElements: number;
    take: number;
  };
}
