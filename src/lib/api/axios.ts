import axios from 'axios';
import { setupInterceptors } from './interceptors';

export const instance = axios.create({
  baseURL: 'https://winereview-api.vercel.app/23-3',
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(instance);
