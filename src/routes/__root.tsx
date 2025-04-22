import React, { useState } from "react";
import { Container, Flex, MantineProvider } from "@mantine/core";
import MyBreadcrumbs from "@shared/components/Breadcrumbs";
import Header from "@shared/components/Header/Header.tsx";
import NavMenu from "@shared/components/NavMenu/NavMenu.tsx";
import { AppContextProvider } from "@shared/providers/AppContextProvider.tsx";
import AuthProvider from "@shared/providers/AuthProvider.tsx";
import { ThemeManager } from "@shared/providers/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

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
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const toggleMenu = (): void => {
    setIsMenuOpen((previous) => !previous);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeManager>
          <AuthProvider>
            <AppContextProvider>
              {!isLoginPage && (
                <Header
                  isBurger={true}
                  isProfile={true}
                  link={true}
                  toggleMenu={toggleMenu}
                  isMenuOpen={isMenuOpen}
                />
              )}
              <Container
                fluid
                className={styles.mainContainer}
                m={0}
                p={0}
                maw="100vw"
                mih={isLoginPage ? "100vh" : "calc(100vh - 52px)"}
              >
                <Flex maw="100%" miw="100%" w="100%" h="100%" direction="row">
                  {!isLoginPage && <NavMenu isMenuOpen={isMenuOpen} />}
                  <div className={styles.contentWrapper}>
                    {!isLoginPage && <MyBreadcrumbs />}
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
