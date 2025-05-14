import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, useMantineColorScheme } from "@mantine/core";
import logout from "@public/assets/logout.svg";
import { useAuthStore } from "@shared/store/authStore.ts";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link, useRouter } from "@tanstack/react-router";

import styles from "./index.module.scss";

export interface MenuItem {
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
  search?: boolean;
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
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useMantineColorScheme();
  const [color, setColor] = useState("");
  // eslint-disable-next-line unicorn/no-null
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    if (colorScheme.colorScheme === "light") {
      setColor("black");
    } else {
      setColor("white");
    }
  }, [colorScheme.colorScheme]);

  // eslint-disable-next-line unicorn/no-null
  if (!items) return null;

  return (
    <>
      {items.map((item) => {
        const hasPermission = permissions.includes(`${item.key}:read`);

        const toggleSubMenu = (): void => {
          // eslint-disable-next-line unicorn/no-null
          setOpenSubMenu(openSubMenu === item.key ? null : item.key);
        };

        return (
          <Menu.Item key={item.key}>
            <Menu>
              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item
                    disabled={!hasPermission}
                    className={styles.menuSubItem}
                    onClick={toggleSubMenu}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={styles.link}
                        disabled={!hasPermission}
                        style={{ color: color }}
                      >
                        {t(item.name)}
                      </Link>
                    ) : (
                      t(item.name)
                    )}
                  </Menu.Sub.Item>
                </Menu.Sub.Target>
                {item.items && (
                  <Menu.Sub.Dropdown
                    className={styles.dropdown}
                    style={{
                      display: openSubMenu === item.key ? "block" : "none",
                    }}
                  >
                    {item.search && (
                      <>
                        <input
                          type="text"
                          placeholder={"Поиск по справочникам"}
                          className={styles.searchInput}
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          onClick={(event) => event.stopPropagation()}
                          onKeyDown={(event) => event.stopPropagation()}
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                        {item.items
                          .filter((subItem) =>
                            t(subItem.name)
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()),
                          )
                          .map((subItem) => {
                            const subItemHasPermission = permissions.includes(
                              `${subItem.key}:read`,
                            );
                            return (
                              <Menu.Item
                                key={subItem.key}
                                disabled={!subItemHasPermission}
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}
                              >
                                <Link
                                  to={subItem.href}
                                  className={styles.link}
                                  disabled={!subItemHasPermission}
                                  style={{ color: color }}
                                >
                                  {t(subItem.name)}
                                </Link>
                              </Menu.Item>
                            );
                          })}
                        {item.items.filter((subItem) =>
                          t(subItem.name)
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        ).length === 0 && (
                          <div className={styles.noResults}>
                            ничего не найдено
                          </div>
                        )}
                      </>
                    )}
                    {!item.search && (
                      <MenuItems items={item.items} permissions={permissions} />
                    )}
                  </Menu.Sub.Dropdown>
                )}
              </Menu.Sub>
            </Menu>
          </Menu.Item>
        );
      })}
    </>
  );
};
export const NavMenu: FC<IMenu> = ({ isMenuOpen, menuData }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  const { permissions } = usePermissionsStore();
  const { clearTokens } = useAuthStore();
  const router = useRouter();
  const handleLogout = (): void => {
    clearTokens();
    router.navigate({ to: "/login", replace: true });
    // eslint-disable-next-line unicorn/no-null
    globalThis.history.pushState(null, "", "/login");
  };

  // eslint-disable-next-line unicorn/no-null
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (key: string): void => {
    // eslint-disable-next-line unicorn/no-null
    setOpenSubMenu(openSubMenu === key ? null : key);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        background: "#006040",
        width: isMenuOpen ? "350px" : "70px",
      }}
      className={`${styles.menuWrapper} ${isMenuOpen ? styles.open : ""}`}
    >
      <Menu trigger="click">
        {menuData.map((group) => {
          const hasPermission = permissions.includes(`${group.key}:read`);

          return (
            <Menu.Sub key={group.key}>
              <Link to={group.href ?? ""}>
                <Menu.Sub.Target>
                  <Menu.Sub.Item
                    className={styles.item}
                    disabled={!hasPermission}
                    onClick={(event) => {
                      event.preventDefault();
                      toggleSubMenu(group.key);
                    }}
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
                style={{
                  padding: 0,
                  display: openSubMenu === group.key ? "block" : "none",
                }}
              >
                <MenuItems items={group.items} permissions={permissions} />
              </Menu.Sub.Dropdown>
            </Menu.Sub>
          );
        })}
      </Menu>
      <Link
        to={"/login"}
        style={{ width: isMenuOpen ? "100%" : "70px" }}
        className={`${styles.logout} ${isMenuOpen ? styles.open : ""}`}
        onClick={() => {
          handleLogout();
        }}
      >
        <img src={logout} alt="" />
        <span>{isMenuOpen ? "Выход" : ""}</span>
      </Link>
    </div>
  );
};
