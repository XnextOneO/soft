import React from "react";
import { MantineProvider } from "@mantine/core";
import { ThemeManager } from "@shared/providers/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "@mantine/core/styles.css";

const RootComponent: React.FC = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeManager>
          {/*<AuthProvider>*/}
          <Outlet />
          {isDevelopment && <TanStackRouterDevtools />}
          {/*</AuthProvider>*/}
        </ThemeManager>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
