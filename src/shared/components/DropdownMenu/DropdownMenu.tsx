import React, { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, TextInput } from "@mantine/core";
import { MenuItem } from "@shared/components/NavMenu/NavMenu.tsx";
import { Link } from "@tanstack/react-router";

const DropdownMenu = ({
  onOpen,
  items = [],
  children,
  searchable,
}: {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: MenuItem[];
  searchable: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const [data, setData] = useState(items);
  const { t } = useTranslation(["directories-menu"]);

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleItemClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const searchDataByName = (value: string): void => {
    setData(
      items.filter((item: MenuItem) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const resetData = (): void => {
    setData(items);
  };

  const renderMenuItems = (items: MenuItem[]): React.ReactNode => {
    if (!Array.isArray(items) || items.length === 0) {
      return <></>;
    }
    return items.map((item: MenuItem, index: number) => {
      const hasSubItems = item.items && item.items.length > 0;
      return (
        <React.Fragment key={index}>
          {hasSubItems ? (
            <DropdownMenu
              onOpen={onOpen}
              items={item.items ?? []}
              searchable={searchable}
            >
              <Menu.Item>{item.name}</Menu.Item>
            </DropdownMenu>
          ) : (
            <Link
              to={`/directories/$slug`}
              params={{
                slug: item.href ?? "",
              }}
              style={{ textDecoration: "none" }}
            >
              <Menu.Item onClick={handleItemClick}>{item.name}</Menu.Item>
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
        }
      }}
      closeOnItemClick={false}
      offset={5}
      radius="xs"
      width={450}
      transitionProps={{ transition: "rotate-right", duration: 150 }}
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
            onClick={handleItemClick}
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
