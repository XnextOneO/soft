import { createContext, useState } from "react";

import BurgerStore from "../store/burgerStore.ts";
import ReferenceBookStore from "../store/referenceBookStore.ts";

interface AppContextType {
  burgerStore: BurgerStore;
  directoriesStore: ReferenceBookStore;
  toggleBurgerMenu: () => void;
}

export const Context = createContext<AppContextType>({
  burgerStore: new BurgerStore(),
  directoriesStore: new ReferenceBookStore(),
  toggleBurgerMenu: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [burgerStore] = useState(() => new BurgerStore());
  const [directoriesStore] = useState(() => new ReferenceBookStore());

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
