import { FC } from "react";
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
  if (!items) return null;

  return (
    <>
      {items.map((item) => (
        <Menu.Item key={item.key} component="a" href={item.href}>
          {item.name}
          {item.items && item.items.length > 0 && (
            <Menu.Sub withArrow={false}>
              <Menu.Sub.Target>
                <Menu.Sub.Item>{item.name}</Menu.Sub.Item>
              </Menu.Sub.Target>
              <Menu.Sub.Dropdown>
                <MenuItems items={item.items} />
              </Menu.Sub.Dropdown>
            </Menu.Sub>
          )}
        </Menu.Item>
      ))}
    </>
  );
};

export const NavMenu: FC<IMenu> = ({ isMenuOpen, menuData }) => {
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
                    <span>{group.name}</span>
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
