// providers.tsx
"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { userInfo } from "@/app/api/auth/authAPI";
import { AppContextProvider } from "@/components/Providers/AppContextProvider";
import { AuthManager } from "@/components/Providers/AuthProvider";
import { ThemeManager } from "@/components/Providers/ThemeProvider";
import { useEditStore } from "@/store/useEditStore";

import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const { setIsEdit } = useEditStore();

  useEffect(() => {
    userInfo()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setIsEdit(data.email_verified);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        throw error; // Throw the error
      });
  }, []);
  return (
    <ThemeManager>
      <AuthManager>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeSwitcher />
            {children}
          </QueryClientProvider>
        </AppContextProvider>
      </AuthManager>
    </ThemeManager>
  );
}
