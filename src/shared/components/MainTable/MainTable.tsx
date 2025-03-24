import { FC, JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Text, useMantineColorScheme } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { MRT_Localization_BY } from "@public/locales/MRT_Localization_BY.ts";
import { postApiData } from "@shared/api/mutation/fetchTableData.ts";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import BottomToolbar from "@shared/components/MainTable/components/bottomToolbar.tsx";
import CreateRowModalContent from "@shared/components/MainTable/components/CreateRowModalContent.tsx";
import EditRowModalContent from "@shared/components/MainTable/components/EditRowModalContent.tsx";
import PopoverCell from "@shared/components/MainTable/components/PopoverCell.tsx";
import RowActions from "@shared/components/MainTable/components/rowActions.tsx";
import TopToolbar from "@shared/components/MainTable/components/topToolbar.tsx";
import UpdateTableModal from "@shared/components/UpdateTableModal/UpdateTableModal.tsx";
import DirectoriesStore from "@shared/store/directoriesStore.ts";
import { userStore } from "@shared/store/userStore.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  MantineReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.esm.mjs";

import classes from "./MainTable.module.scss";

interface MainTableProperties {
  updateTable: boolean;
  link: string;
}

export const MainTable: FC<MainTableProperties> = ({ updateTable, link }) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [localization, setLocalization] = useState(MRT_Localization_RU);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [filter, setFilter] = useState<MRT_ColumnFiltersState>([]);
  const { isEdit, canDelete, canCreate } = userStore();
  const [opened, setOpened] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedGlobalFilter = useDebouncedValue(globalFilter, 200);
  const debouncedColumnFilter = useDebouncedValue(filter, 200);
  const { i18n } = useTranslation();
  const colorScheme = useMantineColorScheme();
  // eslint-disable-next-line unicorn/no-null
  const [error, setError] = useState<string | null>(null);
  const handleGlobalFilterChange = (value: string): void => {
    setGlobalFilter(value);
    setPage(1);
  };
  const directoriesStore = new DirectoriesStore();
  interface SortCriteria {
    [key: string]: "ASC" | "DESC";
  }
  interface FilterCriteria {
    [key: string]: string;
  }

  const sortCriteria: SortCriteria = {};
  for (const sort of sorting) {
    const formattedColumn = sort.id
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toUpperCase();
    sortCriteria[formattedColumn] = sort.desc ? "DESC" : "ASC";
  }

  const columnSearchCriteria: FilterCriteria = {};
  for (const columnFilter of debouncedColumnFilter[0]) {
    if (columnFilter.value) {
      const formattedColumn = columnFilter.id
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toUpperCase();
      columnSearchCriteria[formattedColumn] = String(columnFilter.value);
    }
  }

  useEffect(() => {
    const handleLanguageChange = (lng: string): void => {
      setLocalization(lng === "by" ? MRT_Localization_BY : MRT_Localization_RU);
    };

    handleLanguageChange(i18n.language);

    i18n.on("languageChanged", handleLanguageChange);

    return (): void => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const parametersPost = {
    link: link,
    page: page - 1,
    size: size,
    searchText: debouncedGlobalFilter[0],
    sortCriteria: sortCriteria,
    columnSearchCriteria: columnSearchCriteria,
    dataStatus: "NOT_DELETED",
  };

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["apiData", parametersPost],
    queryFn: async () => {
      try {
        return await postApiData(parametersPost);
      } catch (error_) {
        setError("ошибка сервера");
        throw error_;
      }
    },
    staleTime: 0,
    placeholderData: keepPreviousData,
    retryDelay: 10_000,
    retry: false,
  });

  const columns = data?.content[0] ? Object.keys(data.content[0]) : [];

  const translateColumns = (
    tableColumns: string[],
    tableLink: string,
  ): { accessorKey: string; header: string }[] => {
    const directoryEntry = directoriesStore._directories.find(
      (directory) => directory.link === tableLink,
    );

    const columnsToTranslate = directoryEntry ? directoryEntry.columns : {};

    return tableColumns.map((column) => {
      // eslint-disable-next-line security/detect-object-injection
      const translatedHeader = columnsToTranslate[column] || column;

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

  const columnsWithAccessorKey = translateColumns(columns, link);

  const processedColumns = columnsWithAccessorKey.map((column) => {
    return {
      ...column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cell: ({ cell }: { cell: any }): JSX.Element => {
        const cellValue = cell.getValue();

        if (column.accessorKey === "status") {
          switch (cellValue) {
            case "IN_PROCESSING": {
              return (
                <div className={classes.statusCell}>
                  {/*<Loader size="sm" />*/}
                  <Text c={"yellow"}>В обработке</Text>
                </div>
              );
            }
            case "ERROR": {
              return (
                <div className={classes.statusCell}>
                  {/*<IconSquareX color={"red"} />*/}
                  <Text c={"red"}>Ошибка</Text>
                </div>
              );
            }
            case "SUCCESS": {
              return (
                <div className={classes.statusCell}>
                  {/*<IconRosetteDiscountCheckFilled color={"green"} />*/}
                  <Text c={"green"}>Успешно</Text>
                </div>
              );
            }
            case "CANCELLED": {
              return (
                <div className={classes.statusCell}>
                  {/*<IconRosetteDiscountCheckFilled color={"green"} />*/}
                  <Text c={"gray"}>Отменено</Text>
                </div>
              );
            }
            case "PENDING": {
              return (
                <div className={classes.statusCell}>
                  {/*<IconRosetteDiscountCheckFilled color={"green"} />*/}
                  <Text c={"orange"}>В оиждании</Text>
                </div>
              );
            }
            // No default
          }
        }

        return (
          <div
            // onDoubleClick={() => {
            //     if (isEdit) {
            //         table.setEditingRow(cell.row);
            //     }
            // }}
            className={classes.cell}
          >
            <PopoverCell>{cellValue}</PopoverCell>
          </div>
        );
      },
      size: column.header.length > 12 ? 360 : 200,
      sortDescFirst: true,
    };
  });
  const table = useMantineReactTable({
    onGlobalFilterChange: handleGlobalFilterChange,
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
        parameters={parametersPost}
        setPage={setPage}
        setSize={setSize}
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
      exitCreatingMode();
    },
    enableFilters: true,
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
      sorting,
    },
    initialState: {
      density: "xs",
      showGlobalFilter: true,
      showColumnFilters: false,
    },
    mantineTableBodyCellProps: {
      h: "35px",
      p: "4px 10px",
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
        height: "calc(100vh - 192px)",
        overflowY: "auto",
        borderTop: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
      },
    },
    mantineEditRowModalProps: {
      closeOnClickOutside: true,
      withCloseButton: true,
    },
    localization: localization,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableColumnActions: false,
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
    manualSorting: true,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilter,
    isMultiSortEvent: () => true,
  });

  if (error) {
    return (
      <Flex
        direction={"column"}
        p={0}
        m={0}
        h={"100%"}
        w={"100%"}
        align="center"
        justify="center"
      >
        {error}
      </Flex>
    );
  }

  return data ? (
    <Flex direction={"column"} p={0} m={0} h={"100%"} w={"100%"}>
      <MantineReactTable table={table} />
      <LoadingOverlay visible={isLoading} />
      {updateTable && (
        <UpdateTableModal
          link={link}
          opened={opened}
          close={() => setOpened(false)}
        />
      )}
    </Flex>
  ) : (
    <MainLoader />
  );
};
