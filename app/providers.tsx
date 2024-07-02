"use client";

import React, { createContext } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import BurgerStore from "../store/burgerStore";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

interface AppContextType {
	burgerStore: BurgerStore;
}

export const Context = createContext<AppContextType>({
	burgerStore: new BurgerStore(),
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Context.Provider
			value={{
				burgerStore: new BurgerStore(),
			}}
		>
			<MantineProvider theme={theme}>
				<ThemeSwitcher />
				{children}
			</MantineProvider>
		</Context.Provider>
	);
}
