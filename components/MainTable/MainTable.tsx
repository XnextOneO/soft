import { FC, useState } from "react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Pagination,
  Popover,
  Stack,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import {
  MantineReactTable,
  // eslint-disable-next-line camelcase
  MRT_GlobalFilterTextInput,
  // eslint-disable-next-line camelcase
  MRT_ShowHideColumnsButton,
  useMantineReactTable,
} from "mantine-react-table";
// eslint-disable-next-line camelcase
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import PopoverCell from "@/components/DataTable/PopoverCell";
import { useEditStore } from "@/store/useEditStore";

interface TableProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
}

export const MainTable: FC<TableProperties> = ({ data, columns }) => {
  const [page, setPage] = useState(1);
  const size = 13;
  const [totalElements] = useState(data.length);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { isEdit } = useEditStore();
  console.log("isEdit:", isEdit);

  const columnsWithAccessorKey = columns.map((column) => ({
    ...column,
    accessorKey: column,
    header: column,
  }));

  const processedColumns = columnsWithAccessorKey.map((column) => {
    return {
      ...column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cell: ({ cell }: { cell: any }): JSX.Element => (
        <div
          onDoubleClick={() => {
            if (isEdit) {
              table.setEditingRow(cell.row);
            }
          }}
        >
          <PopoverCell>{cell.getValue()}</PopoverCell>
        </div>
      ),
      size: column.accessorKey.length >= 12 ? 140 : 100,
      sortDescFirst: true,
    };
  });

  const table = useMantineReactTable({
    editDisplayMode: "modal",
    enableEditing: isEdit,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderRowActions: ({ row, table }) => (
      <Flex justify={"center"} align={"center"} gap={"md"}>
        <Tooltip label="Редактирование">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 50,
      },
    },
    renderTopToolbar: () => (
      <Flex direction={"row"} gap={"md"} p={10} justify={"space-between"}>
        <Group gap="xs">
          <Button w={36} p={0} radius="xs" color="#007458">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0734 13.8074V9.08044C24.0734 8.67834 23.5909 8.48175 23.3139 8.76769L21.7233 10.3582C20.8863 9.52117 19.8749 8.87897 18.7613 8.47739C17.6478 8.07582 16.4593 7.92476 15.2807 8.03497C11.5366 8.37452 8.4538 11.3859 8.04276 15.1299C7.82548 17.2292 8.44217 19.3298 9.75979 20.9786C11.0774 22.6273 12.9903 23.692 15.0859 23.9429C17.1815 24.1939 19.2917 23.611 20.9614 22.32C22.631 21.029 23.7263 19.1334 24.0108 17.0422C24.0734 16.506 23.6534 16.0414 23.1173 16.0414C22.6705 16.0414 22.2952 16.372 22.2416 16.8098C21.8573 19.9284 19.1677 22.341 15.9419 22.2963C12.6268 22.2517 9.8299 19.4548 9.77628 16.1307C9.72267 12.6458 12.5553 9.78636 16.0313 9.78636C17.7559 9.78636 19.3196 10.4923 20.4544 11.6182L18.5869 13.4857C18.3009 13.7717 18.4975 14.2542 18.8996 14.2542H23.6266C23.8768 14.2542 24.0734 14.0576 24.0734 13.8074Z"
                fill="white"
              ></path>
            </svg>
          </Button>
          <Button color="#007458" size="sm" radius="xs">
            Обновить таблицу
          </Button>
        </Group>
        <Flex>
          {/* eslint-disable-next-line camelcase */}
          <MRT_GlobalFilterTextInput table={table} />
          {/* eslint-disable-next-line camelcase */}
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      </Flex>
    ),

    renderEditRowModalContent: ({ row }) => (
      <Stack style={{ maxHeight: "80vh" }}>
        {row.getAllCells().map((cell) => {
          return typeof cell.getValue() === "number" ||
            typeof cell.getValue() === "string" ? (
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
          <Button>Сохранить</Button>
        </Flex>
      </Stack>
    ),
    mantineEditRowModalProps: {
      closeOnClickOutside: true,
      withCloseButton: true,
    },
    columns: processedColumns,
    data: data.slice((page - 1) * size, page * size),
    // eslint-disable-next-line camelcase
    localization: MRT_Localization_RU,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    enableColumnResizing: true,
    // enableColumnVirtualization: true,
    memoMode: "table-body",
    layoutMode: "grid",
    mantineTableProps: {
      striped: "even",
      withColumnBorders: true,
    },
    initialState: { density: "xs", showGlobalFilter: true },
    mantineEditTextInputProps: {
      variant: "filled",
      radius: "md",
      size: "md",
      type: "text",
    },
  });

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };
  const handleDelete = (): void => {
    setDeleteModalOpened(false);
  };

  return (
    <Flex
      style={{
        borderRadius: "4px",
        flexDirection: "column",
        gap: "12px",
        justifyContent: "flex-start",
        padding: "0",
        height: "90vh",
      }}
    >
      <MantineReactTable table={table} />
      <Flex align="center" justify={"space-between"}>
        <span>
          Отображены записи {(page - 1) * size + 1}–
          {Math.min(page * size, totalElements)} из {totalElements}
        </span>
        <Pagination
          color="#007458"
          total={Math.ceil(totalElements / size)}
          siblings={1}
          value={page}
          defaultValue={page}
          onChange={handlePageChange}
        />
      </Flex>
    </Flex>
  );
};
