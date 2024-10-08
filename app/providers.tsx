"use client";

import React, { createContext } from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import DirectoriesStore from "@/store/directoriesStore";
import { theme } from "@/theme";

import BurgerStore from "../store/burgerStore";

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
  // const router = useRouter();
  // useEffect(() => {
  //   const responseInterceptor = axios.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error.response.status === 401) {
  //         console.log("ошибка 401 ало");
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
  //   return (): void => {
  //     axios.interceptors.response.eject(responseInterceptor);
  //   };
  // }, [router]);

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
