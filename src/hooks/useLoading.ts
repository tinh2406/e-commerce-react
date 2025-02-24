import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loading: () => void;
  loaded: () => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  loading: () => set({ isLoading: true }),
  loaded: () => set({ isLoading: false }),
}));
