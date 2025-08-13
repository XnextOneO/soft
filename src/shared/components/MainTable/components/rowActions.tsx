import { JSX, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import IconDelete from "@public/assets/IconDelete.svg?react";
import IconEdit from "@public/assets/IconEdit.svg?react";
import { CalendarDeleteModal } from "@shared/components/MainTable/components/RowActions/CalendarDeleteModal.tsx";
import { CalendarEditModal } from "@shared/components/MainTable/components/RowActions/CalendarEditModal.tsx";
import SvgButton from "@shared/components/SvgWrapper/SvgButton";

interface RowActionsProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  refetch: () => void;
  link: string;
}

const RowActions = ({
  row,
  refetch,
  link,
}: RowActionsProperties): JSX.Element => {
  const { t } = useTranslation(["row-actions"]);
  const [openedEditModal, setOpenedEditModal] = useState<boolean>(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
  return (
    <>
      <Flex justify={"center"} align={"center"} gap={8}>
        <Tooltip label={t("row-actions:row-actions.edit")} withArrow>
          <ActionIcon
            variant="transparent"
            color={"dimmed"}
            onClick={() => setOpenedEditModal(true)}
          >
            <SvgButton SvgIcon={IconEdit} fillColor="#999999" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t("row-actions:row-actions.delete")} withArrow>
          <ActionIcon
            variant="transparent"
            color={"dimmed"}
            onClick={() => setOpenedDeleteModal(true)}
          >
            <SvgButton SvgIcon={IconDelete} fillColor="#999999" />
          </ActionIcon>
        </Tooltip>
      </Flex>
      {link === "/calendar" && (
        <>
          <CalendarEditModal
            row={row}
            opened={openedEditModal}
            setOpened={setOpenedEditModal}
            refetch={refetch}
          />
          <CalendarDeleteModal
            row={row}
            opened={openedDeleteModal}
            setOpened={setOpenedDeleteModal}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
};

export default RowActions;
