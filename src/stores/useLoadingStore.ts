import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (status) => set({ isLoading: status }),
}));
