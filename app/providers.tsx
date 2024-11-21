// providers.tsx
"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppContextProvider } from "@/components/Providers/AppContextProvider";
import { AuthManager } from "@/components/Providers/AuthProvider";
import { ThemeManager } from "@/components/Providers/ThemeProvider";

import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
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
