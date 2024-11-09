import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}

export const useEditStore = create(
  persist<StoreState>(
    (set) => ({
      isEdit: true,
      setIsEdit: (value: boolean): void => set({ isEdit: value }),
    }),
    {
      name: "user-permissions",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
