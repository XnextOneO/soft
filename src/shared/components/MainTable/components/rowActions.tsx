import React, { JSX, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import IconDelete from "@public/assets/IconDelete.svg?react";
import IconEdit from "@public/assets/IconEdit.svg?react";
import SvgButton from "@shared/components/SvgWrapper/SvgButton";
import { MRT_RowData } from "mantine-react-table";

interface RowActionsProperties {
  row: MRT_RowData;
  setRow: (row: MRT_RowData) => void;
  refetch: () => void;
  link: string;
  setOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenedDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<MRT_RowData | undefined>>; // New prop
}

const RowActions = ({
  row,
  setRow,
  setOpenedEditModal,
  setOpenedDeleteModal,
  setCurrentRow,
}: RowActionsProperties): JSX.Element => {
  const { t } = useTranslation(["row-actions"]);

  useEffect(() => {
    setRow(row);
  }, [row, setRow]);

  const handleEditClick = (): void => {
    setCurrentRow(row);
    setOpenedEditModal(true);
  };

  const handleDeleteClick = (): void => {
    setCurrentRow(row);
    setOpenedDeleteModal(true);
  };

  return (
    <>
      <Flex justify={"center"} align={"center"} gap={8}>
        <Tooltip label={t("row-actions:row-actions.edit")} withArrow>
          <ActionIcon
            variant="transparent"
            color={"dimmed"}
            onClick={handleEditClick}
          >
            <SvgButton SvgIcon={IconEdit} fillColor="#999999" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t("row-actions:row-actions.delete")} withArrow>
          <ActionIcon
            variant="transparent"
            color={"dimmed"}
            onClick={handleDeleteClick}
          >
            <SvgButton SvgIcon={IconDelete} fillColor="#999999" />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </>
  );
};

export default RowActions;
