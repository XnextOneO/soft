import { useTranslations } from "next-intl";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

interface RowActionsProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
}

const RowActions = ({ row, table }: RowActionsProperties): JSX.Element => {
    const t = useTranslations("row-actions");
    return (
        <Flex justify={"center"} align={"center"}>
            <Tooltip label={t("edit")}>
                <ActionIcon variant="transparent" color={"dimmed"} onClick={() => table.setEditingRow(row)}>
                    <IconPencil stroke={1} />
                </ActionIcon>
            </Tooltip>
        </Flex>
    );
};

export default RowActions;
