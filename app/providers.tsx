"use client";

import React, { createContext } from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import DirectoriesStore from "@/store/directoriesStore";

import BurgerStore from "../store/burgerStore";
import { theme } from "../theme";

interface AppContextType {
  burgerStore: BurgerStore;
  directoriesStore: DirectoriesStore;
}

export const Context = createContext<AppContextType>({
  burgerStore: new BurgerStore(),
  directoriesStore: new DirectoriesStore(),
});
const queryClient = new QueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Context.Provider
      value={{
        burgerStore: new BurgerStore(),
        directoriesStore: new DirectoriesStore(),
      }}
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ThemeSwitcher />
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </Context.Provider>
  );
}
