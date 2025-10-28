/**
 * HTTP client utilities for API calls
 */

import { ApiError } from '../types/api.types';

/**
 * HTTP client configuration
 */
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Custom error class for API errors
 */
export class HttpError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new HttpError('Request timeout - please try again');
    }
    throw error;
  }
}

/**
 * Make GET request to an API endpoint
 */
export async function httpGet<T>(url: string): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new HttpError('Resource not found', 404);
      }
      if (response.status >= 500) {
        throw new HttpError('Service temporarily unavailable', response.status);
      }
      throw new HttpError(`Request failed: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new HttpError('Network error - please check your connection');
    }

    throw new HttpError('An unexpected error occurred', undefined, error);
  }
}

/**
 * Convert HttpError to ApiError format
 */
export function toApiError(error: unknown): ApiError {
  if (error instanceof HttpError) {
    let code = 'UNKNOWN_ERROR';

    if (error.statusCode === 404) {
      code = 'NOT_FOUND';
    } else if (error.statusCode && error.statusCode >= 500) {
      code = 'SERVER_ERROR';
    } else if (error.message.includes('Network')) {
      code = 'NETWORK_ERROR';
    } else if (error.message.includes('timeout')) {
      code = 'TIMEOUT';
    }

    return {
      message: error.message,
      code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      details: error,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: error,
  };
}

