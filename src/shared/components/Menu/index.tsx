import { FC, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для поискового запроса

  // eslint-disable-next-line unicorn/no-null
  if (!items) return null;

  return (
    <>
      {items.map((item) => {
        const hasPermission = permissions.includes(`${item.key}:read`);

        return (
          <Menu.Item key={item.key}>
            <Menu>
              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item
                    disabled={!hasPermission}
                    className={styles.menuSubItem}
                  >
                    <Link to={item.href} className={styles.link}>
                      {t(item.name)}
                    </Link>
                  </Menu.Sub.Item>
                </Menu.Sub.Target>
                {item.items ? (
                  <Menu.Sub.Dropdown className={styles.dropdown}>
                    {item.search && (
                      <>
                        <input
                          type="text"
                          placeholder={t("search-placeholder")}
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
                              >
                                <Link to={subItem.href} className={styles.link}>
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
                ) : // eslint-disable-next-line unicorn/no-null
                null}
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
