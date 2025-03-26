import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, TextInput } from "@mantine/core";
import { Link } from "@tanstack/react-router";

const DropdownMenu = ({
  onOpen,
  items = [], // Установите пустой массив по умолчанию
  children,
  searchable,
}: {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: any[];
  searchable: boolean;
  children: React.ReactNode;
}) => {
  const [data, setData] = useState(items);
  const { t } = useTranslation(["directories-menu"]);

  // Обновление состояния data при изменении items
  useEffect(() => {
    setData(items);
    console.log("searchable -------", searchable);
  }, [items]); // Добавьте items в зависимости

  const handleItemClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const searchDataByName = (value: string): void => {
    setData(
      items.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const resetData = (): void => {
    setData(items);
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((item: any, index: number) => {
      // let encodedLink: string = "";
      const hasSubItems = item.items && item.items.length > 0;
      // if (hasSubItems) {
      //   encodedLink = item.href.replace("/", "__");
      // }
      return (
        <React.Fragment key={index}>
          {hasSubItems ? (
            <DropdownMenu
              onOpen={onOpen}
              items={item.items}
              searchable={searchable}
            >
              <Menu.Item>{item.name}</Menu.Item>
            </DropdownMenu>
          ) : (
            <Link
              to={`/directories/$slug`}
              params={{
                slug: item.href,
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
