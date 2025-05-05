import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "@mantine/core";
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

const MenuItems: FC<{ items?: MenuItem[] }> = ({ items }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  // eslint-disable-next-line unicorn/no-null
  if (!items) return null;
  return (
    <>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.href}>
            <Menu>
              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>{t(item.name)}</Menu.Sub.Item>
                </Menu.Sub.Target>
                {item.items ? (
                  <Menu.Sub.Dropdown className={styles.dropdown}>
                    <MenuItems items={item.items} />
                  </Menu.Sub.Dropdown>
                ) : (
                  ""
                )}
              </Menu.Sub>
            </Menu>
          </Link>
        </Menu.Item>
      ))}
    </>
  );
};

export const NavMenu: FC<IMenu> = ({ isMenuOpen, menuData }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        background: "#006040",
      }}
    >
      {isMenuOpen && (
        <Menu>
          {menuData.map((group) => (
            <Menu.Sub key={group.key}>
              <Link to={group.href ?? ""}>
                <Menu.Sub.Target>
                  <Menu.Sub.Item className={styles.item}>
                    <span>{t(group.name)}</span>
                  </Menu.Sub.Item>
                </Menu.Sub.Target>
              </Link>

              <Menu.Sub.Dropdown>
                <MenuItems items={group.items} />
              </Menu.Sub.Dropdown>
            </Menu.Sub>
          ))}
        </Menu>
      )}
    </div>
  );
};
