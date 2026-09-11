
import axios, { AxiosRequestConfig, Method, AxiosError } from 'axios';
import { ApiResponse} from '../app/TypeInterfaces';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | Method;

const apiCall = async <T = any, B = any, P = any>(
  method: HttpMethod,
  url: string,
  body?: B,
  params?: P,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient<T>({
      method,
      url,
      data: body,
      params,
      ...config,
    });

    return {
      data: response.data,
      error: null,
      status: response.status,
    };
  } catch (err: any) {
    const axiosError = err as AxiosError<{ message?: string; error?: string; status?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      'Something went wrong';

    return {
      data: null,
      error: errorMessage,
      status: axiosError.response?.status,
    };
  }
};

export { apiClient };
export default apiCall;