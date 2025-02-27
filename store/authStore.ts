/* eslint-disable unicorn/no-null */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  expires_in: number;
  refresh_expires_in: number;
  setTokens: (accessToken: string, refreshToken: string, expires_in: number, refresh_expires_in: number) => void;
  clearTokens: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      // eslint-disable-next-line camelcase
      expires_in: 0,
      // eslint-disable-next-line camelcase
      refresh_expires_in: 0,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,camelcase
      setTokens: (accessToken, refreshToken, expires_in, refresh_expires_in) =>
        // eslint-disable-next-line camelcase
        set({ accessToken, refreshToken, expires_in, refresh_expires_in }),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      clearTokens: () => {
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
