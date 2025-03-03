import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
};

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, cache = "default" } = options;

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  const token = localStorage.getItem("auth-token");
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (typeof toast !== "undefined") {
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Something went wrong"}`
      );
    }
    throw error;
  }
}
