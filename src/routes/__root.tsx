import React, { useState } from "react";
import { routeTree } from "@generated/routeTree.gen.ts";
import { Container, Flex, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import menuData from "@public/menuItems.json";
import MyBreadcrumbs from "@shared/components/Breadcrumbs";
import Header from "@shared/components/Header/Header.tsx";
import { MenuItem, NavMenu } from "@shared/components/Menu";
import AuthProvider from "@shared/providers/AuthProvider.tsx";
import { ThemeManager } from "@shared/providers/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";

import "dayjs/locale/ru";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

import styles from "./index.module.scss";

const parseAuthProviderFlag = (
  value: string | boolean | undefined,
): boolean => {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === "") {
    return true;
  }

  return normalizedValue !== "false";
};

const isAuthProviderEnabled = parseAuthProviderFlag(
  import.meta.env.VITE_ENABLE_AUTH_PROVIDER,
);

const RootComponent: React.FC = () => {
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

  const isNotFoundRoute = routeTree.useMatch().globalNotFound;

  const toggleMenu = (): void => {
    setIsMenuOpen((previous) => !previous);
  };

  const menuItems = menuData as MenuItem[];

  const appContent = (
    <>
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
          {!isLoginPage && (
            <NavMenu isMenuOpen={isMenuOpen} menuItems={menuItems} />
          )}
          <div className={styles.contentWrapper}>
            {!isLoginPage && !isNotFoundRoute && <MyBreadcrumbs />}
            <Outlet />
          </div>
        </Flex>
      </Container>
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <DatesProvider settings={{ locale: "ru" }}>
          <ThemeManager>
            {isAuthProviderEnabled ? (
              <AuthProvider>{appContent}</AuthProvider>
            ) : (
              appContent
            )}
          </ThemeManager>
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
