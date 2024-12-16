import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button, Flex, Group, Popover, Stack, Textarea, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface EditRowModalContentProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
    deleteModalOpened: boolean;
    setDeleteModalOpened: (opened: boolean) => void;
    canDelete: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classes: any;
}

const EditRowModalContent: FC<EditRowModalContentProperties> = ({
    row,
    deleteModalOpened,
    setDeleteModalOpened,
    canDelete,
    table,
    classes,
}) => {
    const t = useTranslations("edit-row-modal-content");
    const handleDelete = (): void => {
        setDeleteModalOpened(false);
        // eslint-disable-next-line unicorn/no-null
        table.setEditingRow(null);
        notifications.show({
            title: "Удалено успешно",
            message: "",
            position: "bottom-right",
        });
    };

    const handleSave = (): void => {
        // eslint-disable-next-line unicorn/no-null
        table.setEditingRow(null);
        notifications.show({
            title: "Изменено успешно",
            message: "",
            position: "bottom-right",
        });
    };

    return (
        <Stack mah={"80vh"} gap={5}>
            <Title order={3} pos={"sticky"} top={10} className={classes.modalTitle}>
                {t("create-new-row")}
            </Title>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {row.getAllCells().map((cell: any) => {
                return typeof cell.getValue() === "number" ||
                    typeof cell.getValue() === "string" ||
                    typeof cell.getValue() === "boolean" ? (
                    <Flex direction={"column"} justify={"flex-start"} key={cell.id}>
                        <Title order={4}>{cell.column.columnDef.header}</Title>
                        <Textarea defaultValue={cell.getValue() as string} resize={"vertical"} radius={"md"} autosize />
                    </Flex>
                ) : (
                    <span key={cell.id} />
                );
            })}
            <Flex justify="flex-end" gap={20} pos={"sticky"} bottom={10}>
                <Popover
                    position="bottom"
                    withArrow
                    opened={deleteModalOpened}
                    onClose={() => setDeleteModalOpened(false)}
                >
                    <Popover.Target>
                        <Button
                            variant="outline"
                            color="red"
                            onClick={() => setDeleteModalOpened(true)}
                            disabled={!canDelete}
                        >
                            {t("delete")}
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <span>{t("sure-to-delete")}</span>
                        <Group mt="lg">
                            <Button variant="outline" onClick={() => setDeleteModalOpened(false)}>
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleDelete}>{t("delete")}</Button>
                        </Group>
                    </Popover.Dropdown>
                </Popover>
                <Button
                    onClick={() => {
                        handleSave();
                    }}
                >
                    {t("save")}
                </Button>
            </Flex>
        </Stack>
    );
};

export default EditRowModalContent;
