import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Flex, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import IconDetails from "@public/assets/details.svg?react";
import IconDoubleSum from "@public/assets/double-sum.svg?react";
import IconExport from "@public/assets/export.svg?react";
import IconFilter from "@public/assets/filter.svg?react";
import IconSum from "@public/assets/sum.svg?react";
import { syncDataSCBank } from "@shared/api/mutation/bpAPI.ts";
import { ClientStatus } from "@shared/components/MainTable/MainTable.tsx";
import { IconReload } from "@tabler/icons-react";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
} from "mantine-react-table";

interface TopToolbarProperties {
  refetch: () => void;
  setOpened: (opened: boolean) => void;
  link: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  canCreate: boolean;
  updateTable?: boolean;
  setClientStatus: React.Dispatch<React.SetStateAction<ClientStatus>>;
}

const TopToolbar: FC<TopToolbarProperties> = ({
  refetch,
  link,
  setOpened,
  table,
  canCreate,
  updateTable,
  setClientStatus,
}) => {
  const [t] = useTranslation(["top-toolbar"]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      setClientStatus("ALL");
    } else {
      setClientStatus("OPEN");
    }
  }, [checked, setClientStatus]);
  return (
    <Flex direction={"row"} gap={"md"} p={10} justify={"space-between"}>
      <Group gap="xs">
        <Button
          w={36}
          p={0}
          radius="xs"
          color="#007458"
          onClick={() => refetch()}
        >
          <IconReload />
        </Button>
        {updateTable && (
          <>
            {link === "/business-partner" ? (
              <Button
                color="#007458"
                size="sm"
                radius="xs"
                onClick={() => {
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
                }}
              >
                {t("top-toolbar:top-toolbar.sync-clients")}
              </Button>
            ) : (
              <Button
                color="#007458"
                size="sm"
                radius="xs"
                onClick={() => setOpened(true)}
              >
                {t("top-toolbar:top-toolbar.update-table")}
              </Button>
            )}
          </>
        )}
        {canCreate ? (
          <>
            {link === "/business-partner" ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  table.setCreatingRow(true);
                }}
              >
                {t("top-toolbar:top-toolbar.create-new-row")}
              </Button>
            )}
          </>
        ) : (
          ""
        )}
        {link === "/business-partner" && (
          <Checkbox
            color={"#007458"}
            checked={checked}
            label={"Показать все банки, включая закрытые"}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        )}
      </Group>
      <Flex gap={"5"}>
        <Button w={36} p={5} radius="xs" color="#007458">
          <IconDetails />
        </Button>
        <Button w={36} p={5} radius="xs" color="#007458">
          <IconDoubleSum />
        </Button>
        <Button w={36} p={5} radius="xs" color="#007458">
          <IconSum />
        </Button>
        <Button w={36} p={5} radius="xs" color="#007458">
          <IconExport />
        </Button>
        <Button w={36} p={5} radius="xs" color="#007458">
          <IconFilter />
        </Button>
        <MRT_GlobalFilterTextInput table={table} />
        <MRT_ShowHideColumnsButton table={table} />
      </Flex>
    </Flex>
  );
};

export default TopToolbar;
