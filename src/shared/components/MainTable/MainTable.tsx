import {
  FC,
  JSX,
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Flex,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { MRT_Localization_BY } from "@public/locales/MRT_Localization_BY.ts";
import { getBPInfo } from "@shared/api/mutation/bpAPI.ts";
import { postApiData } from "@shared/api/mutation/fetchTableData.ts";
import {
  BusinessPartnerData,
  BusinessPartnerInfoModal,
} from "@shared/components/BusinessPartnerInfoModal/BusinessPartnerInfoModal.tsx";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import CreateRowModalContent from "@shared/components/MainTable/components/CreateRowModalContent.tsx";
import EditRowModalContent from "@shared/components/MainTable/components/EditRowModalContent.tsx";
import PopoverCell from "@shared/components/MainTable/components/PopoverCell.tsx";
import RowActions from "@shared/components/MainTable/components/rowActions.tsx";
import TopToolbar from "@shared/components/MainTable/components/topToolbar.tsx";
import UpdateTableModal from "@shared/components/UpdateTableModal/UpdateTableModal.tsx";
import { userStore } from "@shared/store/userStore.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  MantineReactTable,
  MRT_ColumnFiltersState,
  MRT_RowVirtualizer,
  MRT_SortingState,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.esm.mjs";

import classes from "./MainTable.module.scss";

interface MainTableProperties {
  updateTable: boolean;
  link: string;
}

interface BusinessPartnerInfo {
  data: BusinessPartnerData;
  columnName: Record<string, string>;
}

export interface SortCriteria {
  [key: string]: "ASC" | "DESC";
}
export interface FilterCriteria {
  [key: string]: string;
}

export interface ParametersPost {
  link: string;
  page: number;
  size: number;
  searchText: string;
  sortCriteria: SortCriteria;
  columnSearchCriteria: FilterCriteria;
  clientStatus: ClientStatus;
}

export type ClientStatus = "ALL" | "CLOSED" | "OPEN";

export const translateColumns = (
  tableColumnsRaw: string[],
  tableColumnsTranslated: Record<string, string> | undefined,
): { header: string; accessorKey: string }[] => {
  return tableColumnsRaw.map((column) => {
    return {
      accessorKey: column,
      header: tableColumnsTranslated?.[`${column}`] || column,
    };
  });
};

export const MainTable: FC<MainTableProperties> = ({ updateTable, link }) => {
  const size = 25;
  const tableContainerReference = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceReference = useRef<MRT_RowVirtualizer>(null);

  const [localization, setLocalization] = useState(MRT_Localization_RU);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [filter, setFilter] = useState<MRT_ColumnFiltersState>([]);
  const { isEdit, canDelete, canCreate } = userStore();
  const [openedUpdateModal, setOpenedUpdateModal] = useState(false);
  const [openedBPInfoModal, setOpenedBPInfoModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedGlobalFilter = useDebouncedValue(globalFilter, 200);
  const debouncedColumnFilter = useDebouncedValue(filter, 200);
  const [clientStatus, setClientStatus] = useState<ClientStatus>("OPEN");
  const { i18n } = useTranslation();
  const colorScheme = useMantineColorScheme();

  const [error, setError] = useState<string | undefined>();
  const [BPInfo, setBPInfo] = useState<BusinessPartnerInfo | undefined>();
  const handleGlobalFilterChange = (value: string): void => {
    setGlobalFilter(value);
  };

  const sortCriteria: SortCriteria = {};
  for (const sort of sorting) {
    const formattedColumn = sort.id;
    // .replace(/([a-z])([A-Z])/g, "$1_$2")
    // .toUpperCase();
    sortCriteria[`${formattedColumn}`] = sort.desc ? "DESC" : "ASC";
  }

  const columnSearchCriteria: FilterCriteria = {};
  for (const columnFilter of debouncedColumnFilter[0]) {
    if (columnFilter.value) {
      const formattedColumn = columnFilter.id
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toUpperCase();
      columnSearchCriteria[`${formattedColumn}`] = String(columnFilter.value);
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

  const parametersPost: ParametersPost = {
    link: link,
    page: 0,
    size: size,
    searchText: debouncedGlobalFilter[0],
    sortCriteria: sortCriteria,
    columnSearchCriteria: columnSearchCriteria,
    clientStatus: clientStatus,
  };
  const { data, refetch, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["apiData", parametersPost],
      queryFn: async ({ pageParam: pageParameter = 0 }) => {
        setError(undefined);
        return await postApiData({
          ...parametersPost,
          page: pageParameter,
        });
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.content.length > 0 ? allPages.length : undefined;
      },
      initialPageParam: 0,
      refetchOnWindowFocus: false,
    });

  const columnsRaw = data?.pages?.[0]?.content[0]
    ? Object.keys(data?.pages?.[0]?.content[0])
    : [];
  const columnsTranslated = data?.pages?.[0]?.columnName;

  const cellValues = useMemo(
    () => data?.pages.flatMap((page) => page.content) ?? [],
    [data],
  );
  const totalDBRowCount = data?.pages?.[0]?.page?.totalElements ?? 0;
  const totalFetched = cellValues.length;
  const fetchMoreOnBottomReached = useCallback(
    (containerReferenceElement?: HTMLDivElement | null) => {
      if (containerReferenceElement) {
        const { scrollHeight, scrollTop, clientHeight } =
          containerReferenceElement;
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  useEffect(() => {
    if (rowVirtualizerInstanceReference.current) {
      try {
        rowVirtualizerInstanceReference.current.scrollToIndex(0);
      } catch (error_) {
        console.error(error_);
      }
    }
  }, [sorting, globalFilter]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerReference.current);
  }, [fetchMoreOnBottomReached]);

  const columnsWithAccessorKey = translateColumns(
    columnsRaw,
    columnsTranslated,
  );

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
                  <Text c={"orange"}>В ожидании</Text>
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
      size: column.header?.length > 12 ? 360 : 200,
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
        parameters={parametersPost}
        refetch={refetch}
        setOpened={setOpenedUpdateModal}
        table={table}
        canCreate={canCreate}
        updateTable={updateTable}
        setClientStatus={setClientStatus}
      />
    ),
    onCreatingRowSave: async ({ exitCreatingMode }) => {
      exitCreatingMode();
    },
    getRowId: (row) => row.userId,
    mantineTableBodyRowProps: ({ row }) => {
      if (link === "/business-partner") {
        return {
          onClick: async (): Promise<void> => {
            const response = await getBPInfo(
              "/business-partner",
              row.original.clientId,
            );
            if (response) {
              setBPInfo({
                data: response.data,
                columnName: response.columnName,
              });
              setOpenedBPInfoModal(true);
            } else {
              setBPInfo(undefined);
            }
          },
          style: {
            cursor: "pointer",
          },
        };
      }
      return {};
    },
    enableFilters: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 50,
      },
    },
    editDisplayMode: "modal",
    enableRowVirtualization: true,
    enableEditing: isEdit && link !== "/business-partner",
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
      ref: tableContainerReference,
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        fetchMoreOnBottomReached(event.target as HTMLDivElement),
      style: {
        height: "calc(100vh - 140px)",
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
    enableMultiRowSelection: false,
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
          opened={openedUpdateModal}
          close={() => setOpenedUpdateModal(false)}
        />
      )}
      {link === "/business-partner" && (
        <BusinessPartnerInfoModal
          data={BPInfo}
          opened={openedBPInfoModal}
          close={() => setOpenedBPInfoModal(false)}
        />
      )}
    </Flex>
  ) : (
    <MainLoader />
  );
};
