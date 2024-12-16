/* eslint-disable camelcase */
import { MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, Group, Pagination, Text } from "@mantine/core";
import {
    MantineReactTable,
    // type MRT_ColumnDef,
    MRT_ColumnFiltersState,
    MRT_GlobalFilterTextInput,
    MRT_ShowHideColumnsButton,
    MRT_SortingState,
    useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import { observer } from "mobx-react-lite";

import { getDirectory, searchDataInDirectory } from "@/app/api/books/directoryAPI";

import { Context } from "../Providers/AppContextProvider";

import classes from "./DataTable.module.scss";
import PopoverCell from "./PopoverCell";

interface IStringIndex {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const DataTable = observer(({ slug, onOpen }: { slug: string; onOpen: MouseEventHandler<HTMLButtonElement> }) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const [columnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [manualSorting, setManualSorting] = useState<{ id: string; desc: string } | object>([]);
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(20);
    const [data, setData] = useState<[]>([]);
    const [countPages, setCountPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false);
    const { directoriesStore } = useContext(Context);

    const findDirectory = useCallback(
        (directorySlug: string) => {
            return directoriesStore.directories.find((directory) => directory.link === directorySlug);
        },
        [directoriesStore.directories],
    );

    const getColumnNames = useCallback(
        (directorySlug: string) => {
            const directory = findDirectory(directorySlug);
            return directory ? directory.columns : {};
        },
        [findDirectory],
    );

    const fetchData = useCallback(
        // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
        async (apiFunction: Function, parameters: any): Promise<void> => {
            try {
                if (data.length === 0) {
                    setIsLoading(true);
                } else {
                    setIsRefetching(true);
                }

                const response = await apiFunction(...parameters);
                console.log(response, "response");
                setTotalElements(response.page.totalElements);
                setCountPages(response.page.totalPages);
                const currentPage = page;
                if (currentPage > countPages) {
                    setPage(countPages === 0 ? 1 : countPages);
                }
                const columnNames = getColumnNames(slug);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const interpretedData = response.content.map((item: any) => {
                    const newItem: IStringIndex = {};
                    for (const key in item) {
                        if (Object.prototype.hasOwnProperty.call(item, key)) {
                            if (key !== "isDelete" && key !== "deleted" && key !== "additionDate") {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                newItem[columnNames[`${key}`] || key] = item[`${key}`];
                            }

                            if (key === "data" || key === "additionDate") {
                                const date = new Date(item[`${key}`]);
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                newItem[columnNames[`${key}`] || key] = date.toLocaleString();
                            }
                        }
                    }
                    return newItem;
                });
                setData(interpretedData);
                setIsLoading(false);
                setIsRefetching(false);
            } catch (error) {
                setIsError(true);
                console.error(error);
            }
        },
        [countPages, data.length, getColumnNames, page, slug],
    );

    useEffect(() => {
        if (isSearchEmpty) {
            fetchData(getDirectory, [slug, page - 1, size, manualSorting]);
        } else {
            fetchData(searchDataInDirectory, [slug, page - 1, size, manualSorting, globalFilter]);
        }
    }, [slug, page, size, manualSorting, globalFilter, fetchData, columnFilters, isSearchEmpty]);

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        globalFilter ? setIsSearchEmpty(false) : setIsSearchEmpty(true);
    }, [globalFilter]);

    useEffect(() => {
        const columnNames = getColumnNames(slug) as { [key: string]: string };
        if (sorting.length > 0) {
            const sortingValue = sorting[0]?.id;
            const sortingDirection = sorting[0]?.desc;
            const sortingKey = Object.keys(columnNames).find((key) => columnNames[`${key}`] === sortingValue);

            setManualSorting({
                id: sortingKey,
                desc: sortingDirection ? "DESC" : "ASC",
            });
        } else setManualSorting({});
    }, [getColumnNames, slug, sorting]);

    const columnsMap = new Map();
    // eslint-disable-next-line unicorn/no-array-for-each
    data.forEach((element: object) => {
        for (const key of Object.keys(element)) {
            columnsMap.set(key, true);
        }
    });

    const columns = data
        ? [...columnsMap.keys()].map((key: string) => {
              return {
                  accessorKey: key,
                  header: key,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  Cell: ({ cell }: { cell: any }): JSX.Element => <PopoverCell>{cell.getValue()}</PopoverCell>,
                  size: key.length >= 15 ? 250 : 180,
                  sortDescFirst: true,
              };
          })
        : [];

    const table = useMantineReactTable({
        columns,
        data,
        enablePagination: false,
        enableGlobalFilterModes: true,
        enableColumnFilters: false,
        enableRowSelection: true,
        enableStickyHeader: true,
        enableBottomToolbar: true,
        enableTopToolbar: false,
        enableDensityToggle: false,
        enableMultiSort: false,
        localization: MRT_Localization_RU,
        enableColumnResizing: true,
        enableColumnVirtualization: true,
        initialState: { density: "xs", showGlobalFilter: true },
        mantineTableContainerProps: { className: classes.tableWithToolbar },
        mantineTableProps: {
            striped: "even",
            withColumnBorders: true,
        },

        mantineLoadingOverlayProps: {
            loaderProps: { color: "#006040", type: "bars" },
        },
        mantineSelectCheckboxProps: {
            color: "#006040",
        },
        mantineSelectAllCheckboxProps: {
            color: "#006040",
        },
        manualSorting: true,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        layoutMode: "grid",
        state: {
            globalFilter,
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        mantineToolbarAlertBannerProps: isError ? { color: "red", children: "Error loading data" } : undefined,
        renderBottomToolbarCustomActions:
            data && data.length > 0
                ? (): JSX.Element => (
                      <Group justify="space-between" w="100%">
                          <Text>
                              Отображены записи {(page - 1) * size + 1}–{Math.min(page * size, totalElements)} из{" "}
                              {totalElements}
                          </Text>

                          <Pagination
                              color="#007458"
                              total={countPages}
                              siblings={1}
                              value={page}
                              defaultValue={page}
                              onChange={setPage}
                          />
                      </Group>
                  )
                : undefined,
        mantineBottomToolbarProps:
            data && data.length > 0
                ? {
                      px: "4px",
                      style: {
                          alignItems: "center",
                          minHeight: 0,
                      },
                  }
                : undefined,
    });

    return (
        <>
            <Flex
                style={{
                    borderRadius: "4px",
                    flexDirection: "row",
                    gap: "16px",
                    justifyContent: "space-between",
                    padding: "10px 10px",
                }}
            >
                <Group gap="xs">
                    <Button
                        w={36}
                        p={0}
                        radius="xs"
                        color="#007458"
                        onClick={() => {
                            setIsLoading(true);
                            return fetchData(getDirectory, [slug, page - 1, size, columnFilters, sorting]).then(() =>
                                setIsLoading(false),
                            );
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24.0734 13.8074V9.08044C24.0734 8.67834 23.5909 8.48175 23.3139 8.76769L21.7233 10.3582C20.8863 9.52117 19.8749 8.87897 18.7613 8.47739C17.6478 8.07582 16.4593 7.92476 15.2807 8.03497C11.5366 8.37452 8.4538 11.3859 8.04276 15.1299C7.82548 17.2292 8.44217 19.3298 9.75979 20.9786C11.0774 22.6273 12.9903 23.692 15.0859 23.9429C17.1815 24.1939 19.2917 23.611 20.9614 22.32C22.631 21.029 23.7263 19.1334 24.0108 17.0422C24.0734 16.506 23.6534 16.0414 23.1173 16.0414C22.6705 16.0414 22.2952 16.372 22.2416 16.8098C21.8573 19.9284 19.1677 22.341 15.9419 22.2963C12.6268 22.2517 9.8299 19.4548 9.77628 16.1307C9.72267 12.6458 12.5553 9.78636 16.0313 9.78636C17.7559 9.78636 19.3196 10.4923 20.4544 11.6182L18.5869 13.4857C18.3009 13.7717 18.4975 14.2542 18.8996 14.2542H23.6266C23.8768 14.2542 24.0734 14.0576 24.0734 13.8074Z"
                                fill="white"
                            ></path>
                        </svg>
                    </Button>
                    <Button color="#007458" size="sm" radius="xs" onClick={onOpen}>
                        Обновить таблицу
                    </Button>
                </Group>

                <Flex gap="xs" align="center">
                    {}
                    <MRT_GlobalFilterTextInput table={table} />
                    {}
                    <MRT_ShowHideColumnsButton table={table} />
                </Flex>
            </Flex>
            <MantineReactTable table={table} />
        </>
    );
});

export default DataTable;
