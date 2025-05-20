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
  search?: boolean;
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

      if (item.items && item.items.length > 0) {
        const filteredItems = item.items.filter((subItem) =>
          t(subItem.name).toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (
          <Menu.SubMenu
            key={item.key}
            title={
              <div
                className={`${styles.title} ${isSubMenu ? styles.subMenuTitle : styles.mainMenuTitle}`}
              >
                <div className={styles.icon}>{item.icon}</div>
                {isSubMenu ? (
                  <span>{t(item.name)}</span>
                ) : (
                  isMenuOpen && (
                    <span className={styles.mainMenuText}>{t(item.name)}</span>
                  )
                )}
              </div>
            }
            expandIcon={<></>}
            disabled={!itemHasPermission}
            className={`${styles.item} ${isSubMenu ? styles.subMenuItem : styles.mainMenuItem}`}
          >
            {item.search && (
              <Menu.Item key={`${item.key}-search`}>
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
              <Menu.Item disabled>Сожалеем, поиск не дал результатов</Menu.Item>
            )}
          </Menu.SubMenu>
        );
      } else {
        // Убедитесь, что дочерние элементы получают правильный класс
        return (
          <Menu.Item
            key={item.key}
            disabled={!itemHasPermission}
            className={styles.subMenuItem}
          >
            <Link
              to={item.href}
              style={{ pointerEvents: itemHasPermission ? "auto" : "none" }}
            >
              {item.icon}
              {isMenuOpen && t(item.name)}
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu
      mode="vertical"
      theme="light"
      triggerSubMenuAction={"click"}
      className={styles.menu}
      style={{ width: isMenuOpen ? "280px" : "72px" }}
    >
      {renderMenuItems(menuItems)}
      <Link to={"/login"}> выход</Link>
    </Menu>
  );
};
