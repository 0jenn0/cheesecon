import { createStore, useStore } from 'zustand';

type State = {
  isUploading: boolean;
  currentUploadCount: number;
  totalUploadCount: number;
};

type Action = {
  setIsUploading: (isUploading: boolean) => void;
  setCurrentUploadCount: (currentUploadCount: number) => void;
  setTotalUploadCount: (totalUploadCount: number) => void;
  resetProgress: () => void;
};

type ProgressStore = State & Action;

const progressStore = createStore<ProgressStore>((set) => ({
  isUploading: false,
  currentUploadCount: 0,
  totalUploadCount: 0,

  setIsUploading: (isUploading) => set({ isUploading }),
  setCurrentUploadCount: (currentUploadCount) => set({ currentUploadCount }),
  setTotalUploadCount: (totalUploadCount) => set({ totalUploadCount }),
  resetProgress: () =>
    set({
      isUploading: false,
      currentUploadCount: 0,
      totalUploadCount: 0,
    }),
}));

export function useProgressStore() {
  return useStore(progressStore);
}
