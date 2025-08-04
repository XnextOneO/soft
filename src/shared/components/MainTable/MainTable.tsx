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
import { Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import IconSort from "@public/assets/IconSort.svg?react";
import IconSortAscending from "@public/assets/IconSortAscending.svg?react";
import IconSortDescending from "@public/assets/IconSortDescending.svg?react";
import { MRT_Localization_BY } from "@public/locales/MRT_Localization_BY.ts";
import { MRT_Localization_RU_Custom } from "@public/locales/MRT_Localization_RU_Custom";
import { getColumnsTable } from "@shared/api/mutation/bpAPI.ts";
import {
  ITableDataResponse,
  postApiData,
} from "@shared/api/mutation/fetchTableData.ts";
import { BusinessPartnerAccountsInfoModal } from "@shared/components/BusinessPartnerAccountsInfoModal/BusinessPartnerAccountsInfoModal.tsx";
import { BusinessPartnerInfoModal } from "@shared/components/BusinessPartnerInfoModal/BusinessPartnerInfoModal.tsx";
import CreateRowModalContent from "@shared/components/MainTable/components/CreateRowModalContent.tsx";
import EditRowModalContent from "@shared/components/MainTable/components/EditRowModalContent.tsx";
import PopoverCell from "@shared/components/MainTable/components/PopoverCell.tsx";
import RowActions from "@shared/components/MainTable/components/rowActions.tsx";
import TopToolbar from "@shared/components/MainTable/components/topToolbar.tsx";
import SvgButton from "@shared/components/SvgWrapper/SvgButton.tsx";
import UpdateTableModal from "@shared/components/UpdateTableModal/UpdateTableModal.tsx";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MantineReactTable,
  MRT_ColumnFiltersState,
  MRT_Icons,
  MRT_RowVirtualizer,
  MRT_SortingState,
  useMantineReactTable,
} from "mantine-react-table";

import classes from "./MainTable.module.scss";
type OnChangeFunction<T> = (updaterOrValue: T | ((old: T) => T)) => void;

interface MainTableProperties {
  updateTable: boolean;
  link: string;
}

export interface SortCriteria {
  [key: string]: "ASC" | "DESC";
}
export interface FilterCriteria {
  [key: string]: string | number;
}

export interface ParametersPost {
  link: string;
  page: number;
  size: number;
  searchText: string;
  sortCriteria: SortCriteria;
  searchCriteria: FilterCriteria;
  status: ClientStatus;
}

interface InfiniteTableDataResponse {
  pages: ITableDataResponse[];
  pageParams: number[];
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

// eslint-disable-next-line complexity
export const MainTable: FC<MainTableProperties> = ({ updateTable, link }) => {
  const size = 30;
  const tableContainerReference = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceReference = useRef<MRT_RowVirtualizer>(null);
  const [showColumnFilters, setShowColumnFilters] = useState<boolean>(false);
  const [localization, setLocalization] = useState(MRT_Localization_RU_Custom);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [filters, setFilters] = useState<MRT_ColumnFiltersState>([]);
  const [openedUpdateModal, setOpenedUpdateModal] = useState(false);
  const [openedBPInfoModal, setOpenedBPInfoModal] = useState(false);
  const [openedBPAInfoModal, setOpenedBPAInfoModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [clientStatus, setClientStatus] = useState<ClientStatus>("OPEN");
  const { i18n } = useTranslation();
  const colorScheme = useMantineColorScheme();
  const [columnsFromData, setColumnsFromData] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [clientId, setClientId] = useState<number | undefined>();

  const sortCriteria: SortCriteria = {};
  for (const sort of sorting) {
    const formattedColumn = sort.id;
    // .replace(/([a-z])([A-Z])/g, "$1_$2")
    // .toUpperCase();
    sortCriteria[`${formattedColumn}`] = sort.desc ? "DESC" : "ASC";
  }

  const debouncedGlobalFilter = useDebouncedCallback((value: string) => {
    setGlobalFilter(value);
  }, 400);

  const handleGlobalFilterChange = (value: string): void => {
    debouncedGlobalFilter(value);
  };

  const debouncedColumnFilters = useDebouncedCallback((value) => {
    setFilters(value);
  }, 400);

  const handleColumnFilterChange: OnChangeFunction<MRT_ColumnFiltersState> = (
    updaterOrValue,
  ) => {
    if (typeof updaterOrValue === "function") {
      const newFilters = updaterOrValue(filters);
      debouncedColumnFilters(newFilters);
    } else {
      debouncedColumnFilters(updaterOrValue);
    }
  };

  const columnSearchCriteria: FilterCriteria = {};
  for (const filter of filters) {
    if (typeof filter.value === "string" || typeof filter.value === "number") {
      columnSearchCriteria[filter.id] = filter.value;
    }
  }

  useEffect(() => {
    const handleLanguageChange = (lng: string): void => {
      setLocalization(
        lng === "by" ? MRT_Localization_BY : MRT_Localization_RU_Custom,
      );
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
    searchText: globalFilter ?? "",
    sortCriteria: sortCriteria,
    searchCriteria: columnSearchCriteria,
    status: clientStatus,
  };
  const { data, refetch, fetchNextPage, isRefetching, isLoading } =
    useInfiniteQuery<ITableDataResponse>({
      queryKey: ["apiData", parametersPost],
      queryFn: async ({ pageParam: pageParameter = 0 }) => {
        setError(undefined);
        return await postApiData({
          ...parametersPost,
          page: Number(pageParameter),
        });
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.content.length > 0 ? allPages.length : undefined;
      },
      initialPageParam: 0,
      refetchOnWindowFocus: false,
    });

  const queryClient = useQueryClient();

  const handleRefetch = async (): Promise<void> => {
    queryClient.setQueryData(
      ["apiData", parametersPost],
      (content: InfiniteTableDataResponse) => ({
        pages: content.pages.slice(0, 1),
        pageParams: content.pageParams.slice(0, 1),
      }),
    );

    await refetch();

    if (tableContainerReference.current) {
      tableContainerReference.current.scrollTo(0, 0);
    }
  };

  const { data: columnsTableData } = useQuery({
    queryKey: ["getColumnsTable", link],
    queryFn: async () => {
      return await getColumnsTable(link);
    },
  });

  useEffect(() => {
    if (data?.pages?.[0]?.content?.[0]) {
      const newColumnsFromData = Object.keys(data.pages[0].content[0]);
      setColumnsFromData(newColumnsFromData);
    }
  }, [data]);
  const columnsRaw = columnsTableData ? columnsFromData : [];
  const columnsTranslated = columnsTableData ?? [];

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
          scrollHeight - scrollTop - clientHeight < 200 &&
          !isRefetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isRefetching, totalFetched, totalDBRowCount],
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
      size: column.header?.length > 12 ? 270 : 180,
      sortDescFirst: true,
    };
  });

  const customIcons: Partial<MRT_Icons> = {
    IconArrowsSort: () => (
      <SvgButton SvgIcon={IconSort} fillColor={"#999999"} />
    ),
    IconSortAscending: () => (
      <SvgButton SvgIcon={IconSortAscending} fillColor={"#006040"} />
    ),
    IconSortDescending: () => (
      <SvgButton SvgIcon={IconSortDescending} fillColor={"#006040"} />
    ),
  };
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
        canDelete={false}
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
        showColumnFilters={showColumnFilters}
        setShowColumnFilters={setShowColumnFilters}
        parameters={parametersPost}
        refetch={handleRefetch}
        canCreate={false}
        setOpened={setOpenedUpdateModal}
        table={table}
        updateTable={updateTable}
        setClientStatus={setClientStatus}
      />
    ),
    onCreatingRowSave: async ({ exitCreatingMode }) => {
      exitCreatingMode();
    },
    mantineTableBodyRowProps: ({ row }) => {
      if (link === "/business-partner") {
        return {
          onClick: async (): Promise<void> => {
            setClientId(row.original.clientId);
            setOpenedBPInfoModal(true);
          },
          style: {
            cursor: "pointer",
          },
        };
      } else if (link === "/business-partner-accounts") {
        return {
          onDoubleClick: async (): Promise<void> => {
            setClientId(row.original.accountInternalId);
            setOpenedBPAInfoModal(true);
          },
          style: {
            cursor: "pointer",
          },
        };
      }
      return {};
    },
    icons: customIcons,
    enableFilters: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 80,
      },
    },
    manualFiltering: true,
    editDisplayMode: "modal",
    enableRowVirtualization: true,
    rowVirtualizerOptions: {
      overscan: 30,
      estimateSize: () => 100,
    },
    enableEditing:
      link !== "/business-partner" && link !== "/business-partner-accounts",
    columns: processedColumns,
    data: cellValues,
    state: {
      globalFilter,
      isLoading: isLoading,
      sorting,
      showColumnFilters: showColumnFilters,
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
      onScroll: (event: UIEvent<HTMLDivElement>) => {
        fetchMoreOnBottomReached(event.target as HTMLDivElement);
      },
      style: {
        height: "calc(100vh - 130px)",
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
    enableColumnVirtualization: false,
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
    onColumnFiltersChange: handleColumnFilterChange,
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
  return (
    <Flex direction={"column"} p={0} m={0} h={"100%"} w={"100%"}>
      <MantineReactTable table={table} />
      {updateTable && (
        <UpdateTableModal
          link={link}
          opened={openedUpdateModal}
          close={() => setOpenedUpdateModal(false)}
        />
      )}
      {link === "/business-partner" && clientId && (
        <BusinessPartnerInfoModal
          clientId={clientId}
          opened={openedBPInfoModal}
          setOpened={setOpenedBPInfoModal}
        />
      )}
      {link === "/business-partner-accounts" && clientId && (
        <BusinessPartnerAccountsInfoModal
          accountInternalId={clientId}
          opened={openedBPAInfoModal}
          setOpened={setOpenedBPAInfoModal}
        />
      )}
    </Flex>
  );
};
