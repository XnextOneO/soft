import { useContext, useState } from "react";
import { useMantineColorScheme } from "@mantine/core";

import { Context } from "../../providers/AppContextProvider.tsx";

import NavMenuStack from "./NavMenuStack";

const NavMenu = () => {
  const { burgerStore } = useContext(Context);
  const colorScheme = useMantineColorScheme();

  const [active, setActive] = useState(false);

  return (
    <>
      {burgerStore.opened ? (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          active={active}
          setActive={setActive}
          width={250}
          opened={true}
          marginLeft={10}
        />
      ) : (
        <NavMenuStack
          colorScheme={colorScheme.colorScheme}
          active={active}
          setActive={setActive}
          width={52}
          opened={false}
          marginLeft={0}
        />
      )}
    </>
  );
};

export default NavMenu;
