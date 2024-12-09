import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface RowActionsProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
}

const RowActions = ({ row, table }: RowActionsProperties): JSX.Element => {
    return (
        <Flex justify={"center"} align={"center"} gap={"md"}>
            <Tooltip label="Редактирование">
                <ActionIcon onClick={() => table.setEditingRow(row)}>
                    <IconEdit />
                </ActionIcon>
            </Tooltip>
        </Flex>
    );
};

export default RowActions;
