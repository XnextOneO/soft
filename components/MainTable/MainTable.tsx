import { FC, useState } from "react";
import {
  ActionIcon,
  Flex,
  Pagination,
  Stack,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  MantineReactTable,
  // eslint-disable-next-line camelcase
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
// eslint-disable-next-line camelcase
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import PopoverCell from "@/components/DataTable/PopoverCell";

interface TableProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  isEdit: boolean;
}

export const MainTable: FC<TableProperties> = ({ data, columns, isEdit }) => {
  const [page, setPage] = useState(1);
  const size = 13;
  const [totalElements] = useState(data.length);

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
        <PopoverCell>{cell.getValue()}</PopoverCell>
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

        {/*<Tooltip label="Удалить">*/}
        {/*  <ActionIcon color="red">*/}
        {/*    <IconTrash />*/}
        {/*  </ActionIcon>*/}
        {/*</Tooltip>*/}
      </Flex>
    ),
    renderEditRowModalContent: ({ row }) => (
      <Stack>
        {row.getAllCells().map((cell) => {
          if (
            typeof cell.getValue() === "number" ||
            typeof cell.getValue() === "string"
          ) {
            return (
              <Textarea
                key={cell.id}
                defaultValue={cell.getValue() as string}
                resize={"vertical"}
                radius={"md"}
              />
            );
          }
        })}
        {/*or map over row.getAllCells() and render your own components */}
        <Flex justify="flex-end">
          {/* eslint-disable-next-line camelcase */}
          <MRT_EditActionButtons row={row} table={table} variant="text" />{" "}
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
    enableColumnResizing: false,
    columnResizeMode: "onEnd",
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
