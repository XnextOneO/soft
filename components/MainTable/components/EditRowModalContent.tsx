import { FC } from "react";
import {
  Button,
  Flex,
  Group,
  Popover,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
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
    <Stack mah={"80vh"}>
      <span className={classes.test}>Редактирование</span>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {row.getAllCells().map((cell: any) => {
        return typeof cell.getValue() === "number" ||
          typeof cell.getValue() === "string" ||
          typeof cell.getValue() === "boolean" ? (
          <Flex direction={"column"} gap={"0"} key={cell.id}>
            <Title order={5}>{cell.column.columnDef.header}</Title>
            <Textarea
              defaultValue={cell.getValue() as string}
              resize={"vertical"}
              radius={"md"}
            />
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
              Удалить
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <span>Вы уверены, что хотите удалить эту запись?</span>
            <Group mt="lg">
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpened(false)}
              >
                Отмена
              </Button>
              <Button onClick={handleDelete}>Удалить</Button>
            </Group>
          </Popover.Dropdown>
        </Popover>
        <Button
          onClick={() => {
            handleSave();
          }}
        >
          Сохранить
        </Button>
      </Flex>
    </Stack>
  );
};

export default EditRowModalContent;
