import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link } from "@tanstack/react-router";
import { Input, Menu } from "antd";

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
  search?: boolean; // Добавлено свойство search
}

interface NavMenuProperties {
  menuItems: MenuItem[];
  isMenuOpen: boolean;
}

export const NavMenu: FC<NavMenuProperties> = ({ menuItems, isMenuOpen }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  const { permissions } = usePermissionsStore();
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
    {},
  );

  const hasPermission = (key: string): boolean => {
    return permissions.includes(`${key}:read`);
  };

  const handleSearchChange = (key: string, value: string): void => {
    setSearchValues((previous) => ({ ...previous, [key]: value }));
  };

  const renderMenuItems = (
    items: MenuItem[],
    isSubMenu: boolean = false,
  ): React.ReactNode[] => {
    return items.map((item) => {
      const itemHasPermission = hasPermission(item.key);
      const searchValue = searchValues[item.key] || "";

      // Фильтруем дочерние элементы, если у родителя есть свойство search
      const filteredItems = item.items?.filter((subItem) =>
        t(subItem.name).toLowerCase().includes(searchValue.toLowerCase()),
      );

      return item.items && item.items.length > 0 ? (
        <Menu.SubMenu
          key={item.key}
          title={isMenuOpen || isSubMenu ? t(item.name) : undefined}
          icon={item.icon}
          disabled={!itemHasPermission}
        >
          {item.search && (
            <Menu.Item key={`${item.key}-search`} className={styles.subMenu}>
              <Input
                placeholder={t("search")}
                value={searchValue}
                onChange={(event) =>
                  handleSearchChange(item.key, event.target.value)
                }
                onClick={(event) => event.stopPropagation()}
              />
            </Menu.Item>
          )}
          {filteredItems && filteredItems.length > 0 ? (
            renderMenuItems(filteredItems as MenuItem[], true)
          ) : (
            <Menu.Item disabled>{t("noResults")}</Menu.Item>
          )}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={item.key}
          disabled={!itemHasPermission}
          className={styles.subMenu}
        >
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
