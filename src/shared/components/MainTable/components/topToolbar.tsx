import React, { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Flex, Group, Loader, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import IconDetails from "@public/assets/details.svg?react";
import IconDoubleSum from "@public/assets/double-sum.svg?react";
import IconFilter from "@public/assets/filter.svg?react";
import IconSC360 from "@public/assets/IconSC360.svg?react";
import IconSum from "@public/assets/sum.svg?react";
import menuData from "@public/menuItems.json";
import { syncDataSCBank } from "@shared/api/mutation/bpAPI.ts";
import { DataExportButton } from "@shared/components/DataExportButton/DataExportButton.tsx";
import {
  ClientStatus,
  ParametersPost,
} from "@shared/components/MainTable/MainTable.tsx";
import { MenuItem } from "@shared/components/Menu";
import SvgButton from "@shared/components/SvgWrapper/SvgButton.tsx";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { IconReload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { MRT_GlobalFilterTextInput } from "mantine-react-table";

import classes from "../MainTable.module.scss";

import { CreateCalendarRowModal } from "./TopToolbar/CreateCalendarRowModal";
import { PrefillCalendarModal } from "./TopToolbar/PrefillCalendarModal";

interface TopToolbarProperties {
  refetch: () => void;
  parameters: ParametersPost;
  setOpened: (opened: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  canCreate: boolean;
  updateTable?: boolean;
  setClientStatus: React.Dispatch<React.SetStateAction<ClientStatus>>;
  setShowColumnFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showColumnFilters: boolean;
}

export const hasSyncPermission = (
  permissions: string[],
  key: string | undefined,
): boolean => {
  return permissions.includes(`${key}:sync`);
};

export const hasUpdatePermission = (
  permissions: string[],
  key: string | undefined,
): boolean => {
  return (
    permissions.includes(`${key}:fileUpdate`) ||
    permissions.includes(`${key}:update-from-a-file`)
  );
};

export const hasCreatePermission = (
  permissions: string[],
  key: string | undefined,
): boolean => {
  return permissions.includes(`${key}:create`);
};

const TopToolbar: FC<TopToolbarProperties> = ({
  refetch,
  parameters,
  setOpened,
  table,
  updateTable,
  setClientStatus,
  setShowColumnFilters,
  showColumnFilters,
}) => {
  const { permissions } = usePermissionsStore();
  const location = useLocation();
  const [t] = useTranslation(["top-toolbar"]);
  const [checked, setChecked] = useState(parameters.status === "ALL");
  const [openedCalendarRowCreateModal, setOpenedCalendarRowCreateModal] =
    useState(false);
  const [openedCalendarPrefillModal, setOpenedCalendarPrefillModal] =
    useState(false);
  const { link } = parameters;
  const isSmallScreen = useMediaQuery(
    link === "/calendar" ? "(max-width: 1100px)" : "(max-width: 1341px)",
  );
  const menuItems = menuData as MenuItem[];

  const findPermissionKey = (items: MenuItem[], pathname: string): string => {
    for (const item of items) {
      if (item.href === pathname) {
        return item.key;
      }

      if (item.items && Array.isArray(item.items)) {
        const foundKey = findPermissionKey(item.items, pathname);
        if (foundKey) {
          return foundKey;
        }
      }
    }
    return "";
  };

  const permissionKey = findPermissionKey(menuItems, location.pathname);

  useEffect(() => {
    setChecked(parameters.status === "ALL");
  }, [parameters.status]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newChecked = event.currentTarget.checked;
    setChecked(newChecked);
    setClientStatus(newChecked ? "ALL" : "OPEN");
  };

  const mutation = useMutation({
    mutationFn: async (_link: string) => {
      return await syncDataSCBank(_link);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      notifications.show({
        title: "Ошибка",
        message: error.message || "Произошла ошибка при синхронизации данных",
        color: "red",
        autoClose: 5000,
      });
    },
  });

  const renderSyncButtonLabel = (): string | ReactElement => {
    if (mutation.isPending) {
      return <Loader color="#fff" size={15} />;
    }
    if (isSmallScreen) {
      return <SvgButton SvgIcon={IconSC360} fillColor={"#fff"} />;
    }
    switch (link) {
      case "/business-partner": {
        return t("top-toolbar:top-toolbar.sync-clients");
      }
      case "/business-partner-accounts": {
        return t("top-toolbar:top-toolbar.sync-accounts");
      }
      default: {
        return "";
      }
    }
  };

  const create = (): void => {
    setOpenedCalendarRowCreateModal(true);
  };

  const preFill = (): void => {
    setOpenedCalendarPrefillModal(true);
  };

  return (
    <>
      <Flex
        direction={"row"}
        gap={"md"}
        py={8}
        px={16}
        justify={"space-between"}
      >
        <Group gap="8px">
          <Tooltip label="Обновить" withArrow>
            <Button
              w={30}
              h={30}
              p={0}
              radius="xs"
              color="#007458"
              onClick={refetch}
            >
              <IconReload width={20} height={20} />
            </Button>
          </Tooltip>
          {updateTable && (
            <>
              {link === "/business-partner" ||
              link === "/business-partner-accounts" ? (
                <Tooltip label="SC360" withArrow>
                  <Button
                    disabled={
                      !hasSyncPermission(permissions, permissionKey) ||
                      mutation.isPending
                    }
                    className={classes.button}
                    h={30}
                    w={isSmallScreen ? 30 : "auto"}
                    px={isSmallScreen ? "0" : "16"}
                    color="#007458"
                    size="sm"
                    style={{
                      fontSize: "12px",
                      minWidth: isSmallScreen ? 30 : 320,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    radius="xs"
                    onClick={() => mutation.mutate(link)}
                  >
                    {renderSyncButtonLabel()}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip label="Обновить из файла" withArrow>
                  <Button
                    // disabled={!hasUpdatePermission(permissions, permissionKey)}
                    disabled={true}
                    className={classes.button}
                    h={30}
                    w={"auto"}
                    px={"16"}
                    color="#007458"
                    size="sm"
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    radius="xs"
                    onClick={() => setOpened(true)}
                  >
                    {t("top-toolbar:top-toolbar.update-table")}
                  </Button>
                </Tooltip>
              )}
            </>
          )}
          {link !== "/business-partner" &&
            hasCreatePermission(permissions, permissionKey) && (
              <Group gap={8}>
                <Tooltip label="Предзаполнение" withArrow>
                  <Button
                    className={classes.button}
                    h={30}
                    w={"auto"}
                    px={"16"}
                    color="#007458"
                    size="sm"
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    radius="xs"
                    onClick={preFill}
                  >
                    {t("top-toolbar:top-toolbar.pre-filling")}
                  </Button>
                </Tooltip>
                <Tooltip label="Добавить" withArrow>
                  <Button
                    className={classes.button}
                    h={30}
                    w={"auto"}
                    px={"16"}
                    color="#007458"
                    size="sm"
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    radius="xs"
                    onClick={create}
                  >
                    {t("top-toolbar:top-toolbar.create-new-row")}
                  </Button>
                </Tooltip>
              </Group>
            )}
          {link === "/business-partner" ||
          link === "/business-partner-accounts" ? (
            <Checkbox
              classNames={{
                label: classes.checkboxLabel,
              }}
              size={"xs"}
              color={"#007458"}
              checked={checked}
              label={`Показать все ${link === "/business-partner-accounts" ? "счета" : "банки"}, включая закрытые`}
              onChange={handleCheckboxChange}
            />
          ) : (
            <></>
          )}
        </Group>
        <Flex gap={"5"} direction={"row"} align={"center"}>
          <Button
            w={30}
            h={30}
            p={5}
            radius="xs"
            color="#007458"
            disabled
            className={classes.button}
          >
            <IconDetails />
          </Button>
          <Button
            w={30}
            h={30}
            p={5}
            radius="xs"
            color="#007458"
            disabled
            className={classes.button}
          >
            <IconDoubleSum />
          </Button>
          <Button
            w={30}
            h={30}
            p={5}
            radius="xs"
            color="#007458"
            disabled
            className={classes.button}
          >
            <IconSum />
          </Button>
          <DataExportButton
            w={30}
            h={30}
            p={5}
            radius={"xs"}
            color={"#007458"}
            parameters={parameters}
          />
          <Tooltip label="Фильтр" withArrow>
            <Button
              w={30}
              h={30}
              p={5}
              className={classes.button}
              radius="xs"
              color="#007458"
              onClick={() => setShowColumnFilters(!showColumnFilters)}
            >
              <IconFilter />
            </Button>
          </Tooltip>
          <MRT_GlobalFilterTextInput
            placeholder={"Поиск по таблице"}
            size={"xs"}
            w={"240px"}
            table={table}
          />
          {/*<MRT_ShowHideColumnsButton size={"30px"} h={30} table={table} />*/}
        </Flex>
      </Flex>
      <CreateCalendarRowModal
        opened={openedCalendarRowCreateModal}
        setOpened={setOpenedCalendarRowCreateModal}
      />
      <PrefillCalendarModal
        opened={openedCalendarPrefillModal}
        setOpened={setOpenedCalendarPrefillModal}
      />
    </>
  );
};

export default TopToolbar;
