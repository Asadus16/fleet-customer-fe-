import { APP_CONFIG } from '@/constants/config';
import type { ApiResponse } from '@/types/common';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  method: HttpMethod,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...restConfig } = config;

  let url = `${APP_CONFIG.apiUrl}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    ...restConfig,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, 'GET', config),

  post: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, 'POST', { ...config, body: JSON.stringify(data) }),

  put: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, 'PUT', { ...config, body: JSON.stringify(data) }),

  patch: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, 'PATCH', { ...config, body: JSON.stringify(data) }),

  delete: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, 'DELETE', config),
};

export { ApiError };
