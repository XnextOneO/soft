import { useTranslation } from "react-i18next";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface RowActionsProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
}

const RowActions = ({ row, table }: RowActionsProperties): JSX.Element => {
  const { t } = useTranslation(["row-actions"]);
  return (
    <Flex justify={"center"} align={"center"}>
      <Tooltip label={t("edit")}>
        <ActionIcon variant="light" onClick={() => table.setEditingRow(row)}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export default RowActions;
