import { FC, useState } from "react";
import { useMantineColorScheme } from "@mantine/core";

import NavMenuStack from "./NavMenuStack";

interface NavMenuProperties {
  isMenuOpen: boolean;
}

const NavMenu: FC<NavMenuProperties> = ({ isMenuOpen }) => {
  const colorScheme = useMantineColorScheme();

  const [active, setActive] = useState(false);
  return (
    <>
      {isMenuOpen ? (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          active={active}
          setActive={setActive}
          width={250}
          opened={isMenuOpen}
          marginLeft={10}
        />
      ) : (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          active={active}
          setActive={setActive}
          width={52}
          opened={isMenuOpen}
          marginLeft={0}
        />
      )}
    </>
  );
};

export default NavMenu;
