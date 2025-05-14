import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link } from "@tanstack/react-router";
import { Menu } from "antd";

import styles from "./index.module.scss";

interface SubMenuItem {
  key: string;
  name: string;
  href: string;
}

export interface MenuItem {
  icon: React.ReactNode;
  key: string;
  name: string;
  items?: (MenuItem | SubMenuItem)[];
  href?: string;
}

interface NavMenuProperties {
  menuItems: MenuItem[];
  isMenuOpen: boolean;
}

export const NavMenu: FC<NavMenuProperties> = ({ menuItems, isMenuOpen }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  const { permissions } = usePermissionsStore();

  const hasPermission = (key: string): boolean => {
    return permissions.includes(`${key}:read`);
  };

  const renderMenuItems = (
    items: MenuItem[],
    isSubMenu: boolean = false,
  ): React.ReactNode[] => {
    return items.map((item) => {
      const itemHasPermission = hasPermission(item.key);

      return item.items && item.items.length > 0 ? (
        <Menu.SubMenu
          key={item.key}
          title={isMenuOpen || isSubMenu ? t(item.name) : undefined}
          icon={item.icon}
          disabled={!itemHasPermission}
        >
          {renderMenuItems(item.items as MenuItem[], true)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.key} disabled={!itemHasPermission}>
          <Link
            to={item.href}
            style={{ pointerEvents: itemHasPermission ? "auto" : "none" }}
          >
            {t(item.name)}
          </Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Menu mode="vertical" theme="light" triggerSubMenuAction={"click"}>
      {renderMenuItems(menuItems)}
    </Menu>
  );
};
