import axios from 'axios';
import { setupLoadingInterceptor } from './loadingInterceptor';
import { setupInterceptors } from './interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupLoadingInterceptor(instance);
setupInterceptors(instance);
