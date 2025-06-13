import React, { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Flex, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import IconDetails from "@public/assets/details.svg?react";
import IconDoubleSum from "@public/assets/double-sum.svg?react";
import IconFilter from "@public/assets/filter.svg?react";
import IconSum from "@public/assets/sum.svg?react";
import menuData from "@public/menuItems.json";
import { syncDataSCBank } from "@shared/api/mutation/bpAPI.ts";
import { DataExportButton } from "@shared/components/DataExportButton/DataExportButton.tsx";
import {
  ClientStatus,
  ParametersPost,
} from "@shared/components/MainTable/MainTable.tsx";
import { MenuItem } from "@shared/components/Menu";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { IconCloudUp, IconReload } from "@tabler/icons-react";
import { useLocation } from "@tanstack/react-router";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
} from "mantine-react-table";

import classes from "../MainTable.module.scss";

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
  return permissions.includes(`${key}:fileUpdate`);
};

const TopToolbar: FC<TopToolbarProperties> = ({
  refetch,
  parameters,
  setOpened,
  table,
  canCreate,
  updateTable,
  setClientStatus,
  setShowColumnFilters,
  showColumnFilters,
}) => {
  const { permissions } = usePermissionsStore();
  const location = useLocation();
  const [t] = useTranslation(["top-toolbar"]);
  const [checked, setChecked] = useState(parameters.clientStatus === "ALL");
  const { link } = parameters;
  const isSmallScreen = useMediaQuery("(max-width: 1180px)");
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
    setChecked(parameters.clientStatus === "ALL");
  }, [parameters.clientStatus]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newChecked = event.currentTarget.checked;
    setChecked(newChecked);
    setClientStatus(newChecked ? "ALL" : "OPEN");
  };

  const handleSyncData = (): void => {
    syncDataSCBank(link)
      .then((response) => {
        if (response === 200) {
          refetch();
          return true;
        } else return false;
      })
      .catch((error) => {
        notifications.show({
          title: "Ошибка",
          message:
            error.response?.data?.message ||
            "Произошла ошибка при синхронизации данных",
          color: "red",
          autoClose: 5000,
        });
      });
  };

  const renderSyncButtonLabel = (): string | ReactElement => {
    if (isSmallScreen) {
      return <IconCloudUp width={20} height={20} />;
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

  return (
    <Flex direction={"row"} gap={"md"} py={8} px={16} justify={"space-between"}>
      <Group gap="8px">
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
        {updateTable && (
          <>
            {link === "/business-partner" ||
            link === "/business-partner-accounts" ? (
              <Button
                disabled={!hasSyncPermission(permissions, permissionKey)}
                className={classes.button}
                p={0}
                h={30}
                w={isSmallScreen ? 30 : "auto"}
                px={isSmallScreen ? "0" : "sm"}
                color="#007458"
                size="sm"
                style={{ fontSize: "12px" }}
                radius="xs"
                onClick={handleSyncData}
              >
                {renderSyncButtonLabel()}
              </Button>
            ) : (
              <Button
                disabled={!hasUpdatePermission(permissions, permissionKey)}
                className={classes.button}
                color="#007458"
                size="sm"
                radius="xs"
                h={30}
                onClick={() => setOpened(true)}
              >
                {t("top-toolbar:top-toolbar.update-table")}
              </Button>
            )}
          </>
        )}
        {canCreate && link !== "/business-partner" && (
          <Button onClick={() => table.setCreatingRow(true)}>
            {t("top-toolbar:top-toolbar.create-new-row")}
          </Button>
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
            label={"Показать все банки, включая закрытые"}
            onChange={handleCheckboxChange}
          />
        ) : (
          <></>
        )}
      </Group>
      <Flex gap={"5"} direction={"row"} align={"center"}>
        <Button w={30} h={30} p={5} radius="xs" color="#007458">
          <IconDetails />
        </Button>
        <Button w={30} h={30} p={5} radius="xs" color="#007458">
          <IconDoubleSum />
        </Button>
        <Button w={30} h={30} p={5} radius="xs" color="#007458">
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
        <Button
          w={30}
          h={30}
          p={5}
          radius="xs"
          color="#007458"
          onClick={() => setShowColumnFilters(!showColumnFilters)}
        >
          <IconFilter />
        </Button>
        <MRT_GlobalFilterTextInput size={"xs"} w={"240px"} table={table} />
        <MRT_ShowHideColumnsButton size={"30px"} h={30} table={table} />
      </Flex>
    </Flex>
  );
};

export default TopToolbar;
