import React, { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, TextInput } from "@mantine/core";
import { MenuItem } from "@shared/components/NavMenu/NavMenu.tsx";
import { Link } from "@tanstack/react-router";

import classes from "../NavMenu/NavMenu.module.scss";

const DropdownMenu = ({
  onOpen,
  onDismiss,
  items = [],
  children,
  searchable,
}: {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDismiss: (value: boolean) => void;
  items: MenuItem[];
  searchable: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const [data, setData] = useState(items);
  const { t } = useTranslation(["directories-menu"]);

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleItemClick = (): void => {
    onDismiss(true);
  };

  const searchDataByName = (value: string): void => {
    setData(
      items.filter((item: MenuItem) =>
        t(item.name).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const resetData = (): void => {
    setData(items);
  };

  const renderMenuItems = (menuItems: MenuItem[]): React.ReactNode => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      return <></>;
    }
    return menuItems.map((item: MenuItem, index: number) => {
      const hasSubItems = item.items && item.items.length > 0;
      const isDisabled = item.disabled ?? false;
      return (
        <React.Fragment key={index}>
          {hasSubItems ? (
            <DropdownMenu
              onOpen={onOpen}
              onDismiss={onDismiss}
              items={item.items ?? []}
              searchable={searchable}
            >
              <Menu.Item disabled={isDisabled}>{t(item.name)}</Menu.Item>
            </DropdownMenu>
          ) : (
            <Link
              to={isDisabled ? "#" : item.href}
              style={{ pointerEvents: isDisabled ? "none" : "auto" }}
            >
              <Menu.Item
                onClick={handleItemClick}
                disabled={isDisabled}
                className={isDisabled ? classes.disabled : ""}
              >
                {t(item.name)}
              </Menu.Item>
            </Link>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Menu
      onChange={(value) => {
        onOpen(value);
        if (!value) {
          resetData();
          onDismiss(false);
        }
      }}
      closeOnItemClick={false}
      offset={5}
      radius="xs"
      width={450}
      position="right-start"
      styles={{ dropdown: { maxHeight: 300, overflowY: "auto" } }}
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown
        style={{ boxShadow: "0px 6px 35px 6px rgba(48, 48, 48, 0.2)" }}
      >
        {searchable && (
          <TextInput
            p="xs"
            w="100%"
            placeholder={t(
              "directories-menu:directories-menu.search-by-directories",
            )}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => searchDataByName(event.target.value)}
          />
        )}

        {data.length > 0 ? (
          renderMenuItems(data)
        ) : (
          <Menu.Item disabled>
            {t("directories-menu:directories-menu.no-data")}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default DropdownMenu;
