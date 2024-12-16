/* eslint-disable camelcase */
import { FC } from "react";
import { Button, Flex, Group } from "@mantine/core";
import { MRT_GlobalFilterTextInput, MRT_ShowHideColumnsButton } from "mantine-react-table";
import { IconReload } from "@tabler/icons-react";

interface TopToolbarProperties {
    refetch: () => void;
    setOpened: (opened: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    canCreate: boolean;
    updateTable?: boolean;
}

const TopToolbar: FC<TopToolbarProperties> = ({ refetch, setOpened, table, canCreate, updateTable }) => {
    return (
        <Flex direction={"row"} gap={"md"} p={10} justify={"space-between"}>
            <Group gap="xs">
                <Button w={36} p={0} radius="xs" color="#007458" onClick={() => refetch()}>
                    <IconReload/>
                </Button>
                {updateTable && (
                    <Button color="#007458" size="sm" radius="xs" onClick={() => setOpened(true)}>
                        Обновить таблицу
                    </Button>
                )}
                {canCreate ? (
                    <Button
                        onClick={() => {
                            table.setCreatingRow(true);
                        }}
                    >
                        Создать запись
                    </Button>
                ) : (
                    ""
                )}
            </Group>
            <Flex>
                <MRT_GlobalFilterTextInput table={table} w={"300px"} />
                <MRT_ShowHideColumnsButton table={table} />
            </Flex>
        </Flex>
    );
};

export default TopToolbar;
