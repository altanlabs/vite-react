import axios, { AxiosInstance } from 'axios';
import { addResponseInterceptor } from './interceptors.ts';

const ALTAN_API_BASE_URL = 'https://api.altan.ai';

// Create a custom instance of axios with specific configuration
const altan_db: AxiosInstance = axios.create({
  baseURL: `${ALTAN_API_BASE_URL}/tables`,
});

// Add API key to request headers
altan_db.interceptors.request.use(
  (config) => {
    config.headers['X-Altan-Key'] = process.env.ALTAN_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
addResponseInterceptor(altan_db);

// Export constants and instances
export {
  ALTAN_API_BASE_URL,
  altan_db,
};

// Type for the fetcher function arguments
type FetcherArgs = string | [string, Record<string, unknown>];

// Generic fetcher function with proper typing
export const fetcher = async <T = unknown>(args: FetcherArgs): Promise<T> => {
  const [url, config] = Array.isArray(args) ? args : [args, {}];
  
  const res = await altan_db.get(url, { ...config });
  
  return res.data;
};
