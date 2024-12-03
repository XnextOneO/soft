import { FC, useState } from "react";
import { Flex } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { fetchApiData, fetchApiDataWithSearch } from "@/app/api/hooks";
import PopoverCell from "@/components/DataTable/PopoverCell";
import { MainLoader } from "@/components/MainLoader/MainLoader";
import BottomToolbar from "@/components/MainTable/components/bottomToolbar";
import EditRowModalContent from "@/components/MainTable/components/EditRowModalContent";
import RowActions from "@/components/MainTable/components/rowActions";
import TopToolbar from "@/components/MainTable/components/topToolbar";
import CreateRowModalContent from "@/components/MainTable/components/сreateRowModalContent";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";
import DirectoriesStore from "@/store/directoriesStore";
import { useEditStore } from "@/store/useEditStore";

import classes from "./MainTable.module.css";

interface MainTableProperties {
  updateTable: boolean;
  link: string;
}

export const MainTable: FC<MainTableProperties> = ({ updateTable, link }) => {
  const [page, setPage] = useState<number>(1);
  const size = 20;
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const { isEdit, canDelete, canCreate } = useEditStore();
  const [opened, setOpened] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedGlobalFilter = useDebouncedValue(globalFilter, 200);
  const directoriesStore = new DirectoriesStore();
  const parameters = {
    page: page - 1,
    size: size,
    sort: "ASC",
    link: link,
    text: debouncedGlobalFilter[0],
  };

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["apiData", parameters],
    queryFn: async () => {
      return parameters.text
        ? fetchApiDataWithSearch(parameters)
        : fetchApiData(parameters);
    },
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const columns = data?.content[0] ? Object.keys(data.content[0]) : [];

  const translateColumns = (
    tableColumns: string[],
  ): { accessorKey: string; header: string }[] => {
    return tableColumns.map((column) => {
      const translatedHeader =
        Object.values(directoriesStore._directories)
          .flatMap((directory) => Object.entries(directory.columns))
          .find(([key]) => key === column)?.[1] || column;

      return {
        accessorKey: column,
        header: translatedHeader,
      };
    });
  };

  const cellValues = data?.content
    ? data.content.map((item: Record<string, string>) => {
        const object: Record<string, string | boolean> = {};
        for (const key of Object.keys(item)) {
          object[key as string] = item[key as string];
        }
        return object;
      })
    : [];

  const totalElements = data?.page?.totalElements || 0;

  const countPages = data?.page?.totalPages || 0;

  const columnsWithAccessorKey = translateColumns(columns);

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
          className={classes.cell}
        >
          <PopoverCell>{cell.getValue()}</PopoverCell>
        </div>
      ),
      size: column.header.length > 12 ? 360 : 200,
      sortDescFirst: true,
    };
  });

  const table = useMantineReactTable({
    onGlobalFilterChange: setGlobalFilter,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderCreateRowModalContent: ({ table, row }) => (
      <CreateRowModalContent
        table={table}
        row={row}
        processedColumns={processedColumns}
        classes={classes}
        createRowModalOpened={createModalOpened}
        setCreateRowModalOpened={setCreateModalOpened}
      />
    ),
    renderBottomToolbarCustomActions: (): JSX.Element => (
      <BottomToolbar
        page={page}
        size={size}
        totalElements={totalElements}
        countPages={countPages}
        parameters={parameters}
        setPage={setPage}
      />
    ),
    renderEditRowModalContent: ({ row }) => (
      <EditRowModalContent
        row={row}
        deleteModalOpened={deleteModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
        canDelete={canDelete}
        table={table}
        classes={classes}
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderRowActions: ({ row, table }) => (
      <RowActions row={row} table={table} />
    ),
    renderTopToolbar: () => (
      <TopToolbar
        refetch={refetch}
        setOpened={setOpened}
        table={table}
        canCreate={canCreate}
        updateTable={updateTable}
      />
    ),
    onCreatingRowSave: async ({ exitCreatingMode }) => {
      // setData((prevData) => [...prevData, { ...values, id: newId }]);
      exitCreatingMode(); // Закрывает модальное окно
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 50,
      },
    },
    editDisplayMode: "modal",
    enableEditing: isEdit,
    columns: processedColumns,
    data: cellValues,
    state: {
      isLoading: isLoading,
      showProgressBars: isFetching,
    },
    initialState: { density: "xs", showGlobalFilter: true },
    mantineTableBodyCellProps: {
      mih: "50px",
    },
    mantineLoadingOverlayProps: {
      loaderProps: { color: "#006040", type: "bars" },
    },
    mantineBottomToolbarProps: {
      style: {
        alignItems: "center",
        minHeight: 0,
      },
    },
    mantineTableContainerProps: {
      style: {
        height: "calc(100vh - 222px)",
        overflowY: "auto",
        borderTop: "1px solid #495057",
      },
    },
    mantineEditRowModalProps: {
      closeOnClickOutside: true,
      withCloseButton: true,
    },
    localization: MRT_Localization_RU,
    enableFullScreenToggle: false,
    enableDensityToggle: true,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,

    mantineTableProps: {
      striped: "even",
      withColumnBorders: true,
    },
    mantineEditTextInputProps: {
      variant: "filled",
      radius: "md",
      size: "md",
      type: "text",
    },
  });

  return data ? (
    <Flex direction={"column"} gap={12} justify={"flex-start"} p={0} h={"100%"}>
      <MantineReactTable table={table} />
      <LoadingOverlay visible={isLoading} />
      {updateTable && (
        <UpdateTableModal
          link={"a"}
          opened={opened}
          close={() => setOpened(false)}
        />
      )}
    </Flex>
  ) : (
    <MainLoader />
  );
};
