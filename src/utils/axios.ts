import axios, { AxiosInstance } from 'axios';
import { addResponseInterceptor } from './interceptors.ts';



const API_BASE_URL = 'https://api.altan.ai/galaxia/hook/2o6RF5';

// Create a custom instance of axios with specific configuration
const altan_db: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add Authentication later here


// Add response interceptor
addResponseInterceptor(altan_db);

// Export constants and instances
export {
  API_BASE_URL,
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
