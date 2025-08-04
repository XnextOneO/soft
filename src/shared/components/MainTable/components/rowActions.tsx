import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import IconDelete from "@public/assets/IconDelete.svg?react";
import IconEdit from "@public/assets/IconEdit.svg?react";
import SvgButton from "@shared/components/SvgWrapper/SvgButton";

interface RowActionsProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
}

const RowActions = ({ row, table }: RowActionsProperties): JSX.Element => {
  const { t } = useTranslation(["row-actions"]);
  return (
    <Flex justify={"center"} align={"center"} gap={8}>
      <Tooltip label={t("row-actions:row-actions.edit")} withArrow>
        <ActionIcon
          variant="transparent"
          color={"dimmed"}
          onClick={() => table.setEditingRow(row)}
        >
          <SvgButton SvgIcon={IconEdit} fillColor="#999999" />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={t("row-actions:row-actions.delete")} withArrow>
        <ActionIcon
          variant="transparent"
          color={"dimmed"}
          onClick={() => table.setEditingRow(row)}
        >
          <SvgButton SvgIcon={IconDelete} fillColor="#999999" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export default RowActions;
