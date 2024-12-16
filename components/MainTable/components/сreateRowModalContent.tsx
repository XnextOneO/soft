import { FC } from "react";
import { Button, Flex, Group, Popover, Stack, Textarea, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface CreateRowModalContentProperties {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processedColumns: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classes: any;
    createRowModalOpened: boolean;
    setCreateRowModalOpened: (value: boolean) => void;
}

const CreateRowModalContent: FC<CreateRowModalContentProperties> = ({
    processedColumns,
    classes,
    createRowModalOpened,
    setCreateRowModalOpened,
    table,
}) => {
    const handleCreate = (): void => {
        setCreateRowModalOpened(false);
        // eslint-disable-next-line unicorn/no-null
        table.setCreatingRow(null);
        notifications.show({
            title: "Создано успешно",
            message: "",
            position: "bottom-right",
        });
    };

    return (
        <Stack mah={"80vh"}>
            <span className={classes.test}>Создать новую запись</span>
            {processedColumns.map((column) => (
                <Flex direction="column" key={column.accessorKey}>
                    <Title order={5}>{column.header}</Title>
                    <Textarea placeholder={`Введите ${column.header}`} resize={"vertical"} autosize />
                </Flex>
            ))}
            <Flex justify="flex-end" gap={20} pos={"sticky"} bottom={10}>
                <Popover
                    position="bottom"
                    withArrow
                    opened={createRowModalOpened}
                    onClose={() => setCreateRowModalOpened(false)}
                >
                    <Popover.Target>
                        <Button onClick={() => setCreateRowModalOpened(true)}>Создать</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <span>Вы уверены, что хотите создать эту запись?</span>
                        <Group mt="lg">
                            <Button variant="outline" onClick={() => setCreateRowModalOpened(false)}>
                                Отмена
                            </Button>
                            <Button onClick={handleCreate}>Создать</Button>
                        </Group>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
        </Stack>
    );
};

export default CreateRowModalContent;
