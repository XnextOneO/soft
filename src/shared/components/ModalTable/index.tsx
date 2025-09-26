import { FC } from "react";
import { Modal } from "@mantine/core";
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
  onClose: () => void;
  title: string;
}

export const ModalTable: FC<ModalTableProperties> = ({
  isOpen,
  onClose,
  title,
}) => {
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
  });

  return (
    <Modal
      onClose={onClose}
      opened={isOpen}
      title={title}
      classNames={{ header: styles.header }}
    >
      <MantineReactTable table={table} />
    </Modal>
  );
};
