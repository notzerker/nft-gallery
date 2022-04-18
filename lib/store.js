import create from "zustand";

const useStore = create((set) => ({
  dark: false,
  setDark: () => set((state) => ({ dark: !state.dark })),
}));

export default useStore;
