import React, { createContext, useContext, useState } from "react";

interface MenuContextType {
  clearActiveMenuItem: () => void;
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  selectedKeys: string[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const clearActiveMenuItem = (): void => {
    setSelectedKeys([]);
  };

  return (
    <MenuContext.Provider
      value={{ clearActiveMenuItem, setSelectedKeys, selectedKeys }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
