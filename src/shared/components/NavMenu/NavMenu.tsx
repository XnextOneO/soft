import { FC } from "react";
import { useMantineColorScheme } from "@mantine/core";
import menuItemsData from "@public/menuItems.json"; // Импортируйте ваш JSON-файл

import NavMenuStack from "./NavMenuStack";

interface NavMenuProperties {
  isMenuOpen: boolean;
}

export interface MenuItem {
  icon?: string;
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
}

const NavMenu: FC<NavMenuProperties> = ({ isMenuOpen }) => {
  const colorScheme = useMantineColorScheme();
  const menuItems: MenuItem[] = menuItemsData;

  return (
    <>
      {isMenuOpen ? (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          width={280}
          opened={isMenuOpen}
          menuItems={menuItems}
        />
      ) : (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          width={72}
          opened={isMenuOpen}
          menuItems={menuItems}
        />
      )}
    </>
  );
};

export default NavMenu;
