import { createContext, useState } from "react";

import BurgerStore from "../../store/burgerStore";
import DirectoriesStore from "../../store/directoriesStore";

interface AppContextType {
  burgerStore: BurgerStore;
  directoriesStore: DirectoriesStore;
}

export const Context = createContext<AppContextType>({
  burgerStore: new BurgerStore(),
  directoriesStore: new DirectoriesStore(),
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [burgerStore] = useState(() => new BurgerStore());
  const [directoriesStore] = useState(() => new DirectoriesStore());

  return (
    <Context.Provider value={{ burgerStore, directoriesStore }}>
      {children}
    </Context.Provider>
  );
}
