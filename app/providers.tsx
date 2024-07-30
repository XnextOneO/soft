"use client";

import React, { createContext } from "react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { theme } from "../theme";
import BurgerStore from "../store/burgerStore";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import DirectoriesStore from "@/store/directoriesStore";

interface AppContextType {
	burgerStore: BurgerStore;
	directoriesStore: DirectoriesStore;
}

export const Context = createContext<AppContextType>({
	burgerStore: new BurgerStore(),
	directoriesStore: new DirectoriesStore(),
});

export function Providers({ children }: { children: React.ReactNode }) {
	
	return (
		<Context.Provider
			value={{
				burgerStore: new BurgerStore(),
				directoriesStore: new DirectoriesStore(),
			}}
		>
			<MantineProvider theme={theme}>
				<ThemeSwitcher />
				{children}
			</MantineProvider>
		</Context.Provider>
	);
}
