import { AxiosInstance } from 'axios';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const setupLoadingInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    useLoadingStore.getState().setIsLoading(true);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      useLoadingStore.getState().setIsLoading(false);
      return response;
    },
    (error) => {
      useLoadingStore.getState().setIsLoading(false);
      return Promise.reject(error);
    },
  );
};
