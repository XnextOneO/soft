import { FC, useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";

import styles from "./index.module.scss";

interface DataRow {
  id: number;
  name: string;
  value: number;
}

const data: DataRow[] = [
  { id: 1, name: "Item 1", value: 10 },
  { id: 2, name: "Item 2", value: 20 },
  { id: 3, name: "Item 3", value: 30 },
  { id: 4, name: "Item 3", value: 30 },
  { id: 5, name: "Item 3", value: 30 },
  { id: 6, name: "Item 3", value: 30 },
  { id: 7, name: "Item 3", value: 30 },
  { id: 8, name: "Item 3", value: 30 },
  { id: 9, name: "Item 3", value: 30 },
  { id: 10, name: "Item 3", value: 30 },
  { id: 11, name: "Item 3", value: 30 },
];

const columns: MRT_ColumnDef<DataRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "value",
    header: "Value",
    sortingFn: "alphanumeric",
  },
];

interface ModalTableProperties {
  isOpen: boolean;
  close: () => void;
  title: string;
  onValueSelect: (value: string) => void;
}

export const ModalTable: FC<ModalTableProperties> = ({
  isOpen,
  title,
  close,
  onValueSelect,
}) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>();

  const handleRowClick = (row: DataRow): void => {
    setSelectedRowId(row.id);
  };

  const handleRowSelect = (): void => {
    if (selectedRowId !== null) {
      const selectedRow = data.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        onValueSelect(selectedRow.name); // Передаем значение из выбранной строки
      }
    }
    close(); // Закрываем модальное окно
  };

  const table = useMantineReactTable({
    data,
    columns,
    enableSorting: true,
    initialState: { density: "xs" },
    mantineTableBodyCellProps: { h: "35px", p: "4px 10px" },
    mantineLoadingOverlayProps: {
      loaderProps: { color: "#006040", type: "bars" },
    },
    mantineTableContainerProps: {
      style: { height: "30vh", overflowY: "auto" },
    },
    enableColumnResizing: true,
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    enableColumnActions: false,
    mantineTableProps: { striped: "even", withColumnBorders: true },
    manualSorting: false,
    manualPagination: true,
    isMultiSortEvent: () => true,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: (): void => handleRowClick(row.original),
      style: {
        backgroundColor: selectedRowId === row.original.id ? "#999" : "",
      },
    }),
    mantineTableFooterProps: {
      children: (
        <tr>
          <td colSpan={2} style={{ textAlign: "right" }}>
            <strong>Итого:</strong>{" "}
            {data.reduce((accumulator, item) => accumulator + item.value, 0)}
          </td>
        </tr>
      ),
    },
  });

  return (
    <Modal
      opened={isOpen}
      title={title}
      onClose={close}
      classNames={{
        header: styles.header,
        close: styles.closeButton,
        content: styles.content,
        body: styles.mantineModalBody,
      }}
    >
      <MantineReactTable table={table} />
      <div className={styles.footer}>
        <Group w={"100%"} justify={"end"}>
          <Button
            className={styles.chooseBtn}
            color="blue"
            onClick={handleRowSelect}
          >
            Выбрать
          </Button>
        </Group>
      </div>
    </Modal>
  );
};
