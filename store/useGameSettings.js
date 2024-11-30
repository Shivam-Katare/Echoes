import { create } from 'zustand';

const useGameSettingsStore = create((set) => ({
  category: null,
  difficulty: 'easy',
  time: '45',
  challangeType: 'words',
  isTransitioning: false,
  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setTime: (time) => set({ time }),
  setChallangeType: (challangeType) => set({ challangeType }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  resetSettings: () => set({ category: null, difficulty: 'easy', time: '45', challangeType: 'words' }),
}));

export default useGameSettingsStore;
