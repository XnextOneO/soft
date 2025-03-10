import React from "react";
import { MantineProvider } from "@mantine/core";
import AuthProvider from "@shared/providers/AuthProvider.tsx";
import { ThemeManager } from "@shared/providers/ThemeProvider.tsx";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RootComponent: React.FC = () => {
  const isDevelopment = import.meta.env.MODE === "development";

  return (
    <MantineProvider>
      <ThemeManager>
        <AuthProvider>
          <Outlet />
          {isDevelopment && <TanStackRouterDevtools />}
        </AuthProvider>
      </ThemeManager>
    </MantineProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
