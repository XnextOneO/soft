import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "@mantine/core";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link } from "@tanstack/react-router";

import styles from "./index.module.scss";

interface MenuItem {
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
}

interface MenuGroup {
  icon: string;
  key: string;
  name: string;
  items?: MenuItem[];
  href?: string;
}

interface IMenu {
  isMenuOpen: boolean;
  menuData: MenuGroup[];
}

const MenuItems: FC<{ items?: MenuItem[]; permissions: string[] }> = ({
  items,
  permissions,
}) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  // eslint-disable-next-line unicorn/no-null
  if (!items) return null;

  return (
    <>
      {items.map((item) => {
        const hasPermission = permissions.includes(`${item.key}:read`);

        return (
          <Menu.Item key={item.key}>
            <Link to={item.href} style={{ width: "100%", marginRight: "10px" }}>
              <Menu>
                <Menu.Sub>
                  <Menu.Sub.Target>
                    <Menu.Sub.Item
                      disabled={!hasPermission}
                      className={styles.menuSubItem}
                    >
                      {t(item.name)}
                    </Menu.Sub.Item>
                  </Menu.Sub.Target>
                  {item.items ? (
                    <Menu.Sub.Dropdown className={styles.dropdown}>
                      <MenuItems items={item.items} permissions={permissions} />
                    </Menu.Sub.Dropdown>
                  ) : // eslint-disable-next-line unicorn/no-null
                  null}
                </Menu.Sub>
              </Menu>
            </Link>
          </Menu.Item>
        );
      })}
    </>
  );
};

export const NavMenu: FC<IMenu> = ({ isMenuOpen, menuData }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  const { permissions } = usePermissionsStore(); // Получение разрешений

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        background: "#006040",
      }}
      className={styles.menuWrapper}
    >
      <Menu trigger={"click"}>
        {menuData.map((group) => {
          const hasPermission = permissions.includes(`${group.key}:read`);

          return (
            <Menu.Sub key={group.key}>
              <Link to={group.href ?? ""}>
                <Menu.Sub.Target>
                  <Menu.Sub.Item
                    className={styles.item}
                    disabled={!hasPermission}
                  >
                    <div className={styles.iconWrapper}>
                      <span className={styles.iconSpan}> {group.icon}</span>
                    </div>
                    {isMenuOpen ? (
                      <div className={styles.menuTextWrapper}>
                        <span>{t(group.name)}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Menu.Sub.Item>
                </Menu.Sub.Target>
              </Link>

              <Menu.Sub.Dropdown
                className={styles.menuSubDropdown}
                style={{ padding: 0 }}
              >
                <MenuItems items={group.items} permissions={permissions} />
              </Menu.Sub.Dropdown>
            </Menu.Sub>
          );
        })}
      </Menu>
    </div>
  );
};
