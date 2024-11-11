import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  canDelete: boolean;
  setCanDelete: (value: boolean) => void;
  clearStore: () => void;
}

export const useEditStore = create(
  persist<StoreState>(
    (set) => ({
      isEdit: false,
      setIsEdit: (value: boolean): void => set({ isEdit: value }),
      canDelete: false,
      setCanDelete: (value: boolean): void => set({ canDelete: value }),
      clearStore: (): void => {
        set({ isEdit: false });
        localStorage.removeItem("user-permissions");
      },
    }),
    {
      name: "user-permissions",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
