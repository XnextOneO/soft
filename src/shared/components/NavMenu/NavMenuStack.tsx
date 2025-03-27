import React, { FC, SVGProps, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Stack, UnstyledButton } from "@mantine/core";
import DropdownMenu from "@shared/components/DropdownMenu/DropdownMenu.tsx";
import { useAuthStore } from "@shared/store/authStore.ts";
import { useRouter } from "@tanstack/react-router";

import IconLogout from "../../../../public/assets/logout.svg?react";

import NavMenuButtonStack from "./NavMenuButtonStack";

interface INavMenuStackProperties {
  colorScheme: string;
  width: number;
  opened: boolean;
  marginLeft: number;
  menuItems: MenuItem[];
}

interface MenuItem {
  icon?: FC<SVGProps<SVGSVGElement>> | undefined;
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
}

const NavMenuStack: FC<INavMenuStackProperties> = ({
  colorScheme,
  width,
  opened,
  marginLeft,
  menuItems,
}) => {
  const router = useRouter();
  const { clearTokens } = useAuthStore();
  const { t } = useTranslation(["nav-menu-stack"]);

  const [activeKey, setActiveKey] = useState<string | null>("");

  const handleLogout = (): void => {
    clearTokens();
    router.navigate({ to: "/login", replace: true });
  };

  const handleMenuItemClick = (key: string): void => {
    setActiveKey(key);
  };

  const renderMenuItems = (items: MenuItem[]): React.ReactNode => {
    if (!Array.isArray(items) || items.length === 0) {
      return <></>;
    }

    return items
      .filter((item) => item.key !== "logout" && item.key !== "statuses")
      .map((item) => {
        const { key, name, items: subItems, icon: ItemIcon } = item;
        const isActive = activeKey === key;
        const IconComponent = ItemIcon || undefined; // Use a default icon if none is provided

        return (
          <DropdownMenu
            key={key}
            onOpen={() => handleMenuItemClick(key)}
            items={subItems ?? []}
            searchable={true}
          >
            <UnstyledButton onClick={() => handleMenuItemClick(key)}>
              <NavMenuButtonStack
                icon={IconComponent}
                colorScheme={colorScheme}
                active={isActive}
                width={width}
                marginLeft={marginLeft}
              >
                {opened ? name : ""}
              </NavMenuButtonStack>
            </UnstyledButton>
          </DropdownMenu>
        );
      });
  };

  return (
    <Stack
      justify="space-between"
      w={width}
      gap={0}
      style={{
        borderRight: `1px solid ${colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
      }}
      h="100%"
    >
      <Stack gap={0}>{renderMenuItems(menuItems)}</Stack>
      <UnstyledButton onClick={handleLogout}>
        <Flex justify="center">
          <NavMenuButtonStack
            colorScheme={colorScheme}
            width={width}
            marginLeft={marginLeft}
            icon={IconLogout}
          >
            {opened ? t("nav-menu-stack:nav-menu-stack.logout") : ""}
          </NavMenuButtonStack>
        </Flex>
      </UnstyledButton>
    </Stack>
  );
};

export default NavMenuStack;
