import { createContext, useState } from "react";

import BurgerStore from "../store/burgerStore.ts";
import DirectoriesStore from "../store/directoriesStore.ts";

interface AppContextType {
  burgerStore: BurgerStore;
  directoriesStore: DirectoriesStore;
  toggleBurgerMenu: () => void;
}

export const Context = createContext<AppContextType>({
  burgerStore: new BurgerStore(),
  directoriesStore: new DirectoriesStore(),
  toggleBurgerMenu: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [burgerStore] = useState(() => new BurgerStore());
  const [directoriesStore] = useState(() => new DirectoriesStore());

  const toggleBurgerMenu = (): void => {
    burgerStore.toggleOpened();
  };

  return (
    <Context.Provider
      value={{ burgerStore, directoriesStore, toggleBurgerMenu }}
    >
      {children}
    </Context.Provider>
  );
}
