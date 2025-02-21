/* eslint-disable camelcase */
import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button, Flex, Group } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { MRT_GlobalFilterTextInput, MRT_ShowHideColumnsButton, MRT_ToggleFiltersButton } from "mantine-react-table";

interface TopToolbarProperties {
    refetch: () => void;
    setOpened: (opened: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    canCreate: boolean;
    updateTable?: boolean;
}

const TopToolbar: FC<TopToolbarProperties> = ({ refetch, setOpened, table, canCreate, updateTable }) => {
    const t = useTranslations("top-toolbar");
    return (
        <Flex direction={"row"} gap={"md"} p={10} justify={"space-between"}>
            <Group gap="xs">
                <Button w={36} p={0} radius="xs" color="#007458" onClick={() => refetch()}>
                    <IconReload />
                </Button>
                {updateTable && (
                    <Button color="#007458" size="sm" radius="xs" onClick={() => setOpened(true)}>
                        {t("update-table")}
                    </Button>
                )}
                {canCreate ? (
                    <Button
                        onClick={() => {
                            table.setCreatingRow(true);
                        }}
                    >
                        {t("create-new-row")}
                    </Button>
                ) : (
                    ""
                )}
            </Group>
            <Flex gap={"5"}>
                <MRT_GlobalFilterTextInput table={table} w={"300px"} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
            </Flex>
        </Flex>
    );
};

export default TopToolbar;
