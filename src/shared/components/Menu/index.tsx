import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMenuContext } from "@shared/providers/MenuContextProvider.tsx";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link } from "@tanstack/react-router";
import { Menu } from "antd";

import "./index.scss";

export interface SubMenuItem {
  key: string;
  name: string;
  href: string;
}

export interface MenuItem {
  icon?: React.ReactNode;
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
  const { setSelectedKeys, selectedKeys } = useMenuContext();

  const hasPermission = (key: string): boolean => {
    return permissions.includes(`${key}:read`);
  };

  const handleSearchChange = (key: string, value: string): void => {
    setSearchValues((previous) => ({ ...previous, [key]: value }));
  };

  const handleMenuItemClick = (parentKey: string): void => {
    setSelectedKeys([parentKey]);
  };

  const renderMenuItems = (
    items: MenuItem[],
    isSubMenu: boolean = false,
    // eslint-disable-next-line unicorn/no-null
    parentKey: string | null = null,
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
                className={`${"title"} ${isSubMenu ? "subMenuTitle" : "mainMenuTitle"}`}
              >
                {!isSubMenu && <div className={"icon"}>{item.icon}</div>}
                {isSubMenu ? (
                  <span>{t(item.name)}</span>
                ) : (
                  isMenuOpen && (
                    <span className={"mainMenuText"}>{t(item.name)}</span>
                  )
                )}
              </div>
            }
            expandIcon={<></>}
            disabled={!itemHasPermission}
          >
            {item.search && (
              <Menu.Item key={`${item.key}-search`} className={"topSearch"}>
                <input
                  className="search"
                  placeholder={"Поиск по справочникам"}
                  value={searchValue}
                  onChange={(event) =>
                    handleSearchChange(item.key, event.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                />
              </Menu.Item>
            )}
            {filteredItems && filteredItems.length > 0 ? (
              renderMenuItems(filteredItems as MenuItem[], true, item.key)
            ) : (
              <Menu.Item disabled>Сожалеем, поиск не дал результатов</Menu.Item>
            )}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            disabled={!itemHasPermission}
            className={"subMenuItem"}
            onClick={() => handleMenuItemClick(parentKey || item.key)}
          >
            <Link to={item.href} className={"link"}>
              <span>{item.icon}</span>
              <span>{isSubMenu && t(item.name)}</span>
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
      className={"menu"}
      style={{ width: isMenuOpen ? "350px" : "72px" }}
      selectedKeys={selectedKeys}
    >
      {renderMenuItems(menuItems)}
      <Link to={"/login"}> выход</Link>{" "}
    </Menu>
  );
};
