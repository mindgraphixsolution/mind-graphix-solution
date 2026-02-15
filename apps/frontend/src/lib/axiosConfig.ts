import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from './api/config';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth token
      localStorage.removeItem('authToken');
      // Redirect to login
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied');
      window.location.href = '/403';
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    // Handle 5xx Server Errors
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.message);
      // Could dispatch to error tracking service here
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

/**
 * Utility function to make API calls with error handling
 */
export async function apiCall<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: any
): Promise<T> {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });
    return response.data as T;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw {
      status: axiosError.response?.status,
      message: axiosError.message,
      data: axiosError.response?.data,
    };
  }
}
