import React, { useState } from "react";
import { Container, Flex, MantineProvider } from "@mantine/core";
import MyBreadcrumbs from "@shared/components/Breadcrumbs";
import Header from "@shared/components/Header/Header.tsx";
import NavMenu from "@shared/components/NavMenu/NavMenu.tsx";
import { AppContextProvider } from "@shared/providers/AppContextProvider.tsx";
import AuthProvider from "@shared/providers/AuthProvider.tsx";
import { ThemeManager } from "@shared/providers/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "@mantine/core/styles.css";

import styles from "./index.module.scss";

const RootComponent: React.FC = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((previous) => !previous);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeManager>
          <AuthProvider>
            <AppContextProvider>
              <Header
                isBurger={true}
                isProfile={true}
                link={true}
                toggleMenu={toggleMenu}
                isMenuOpen={isMenuOpen}
              />
              <Container
                fluid
                className={styles.mainContainer}
                m={0}
                p={0}
                maw="100vw"
              >
                <Flex maw="100%" miw="100%" w="100%" h="100%" direction="row">
                  <NavMenu isMenuOpen={isMenuOpen} />
                  <div className={styles.contentWrapper}>
                    <MyBreadcrumbs />
                    <Outlet />
                  </div>
                </Flex>
              </Container>

              {isDevelopment && <TanStackRouterDevtools />}
            </AppContextProvider>
          </AuthProvider>
        </ThemeManager>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
