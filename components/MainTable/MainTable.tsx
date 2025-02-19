/* eslint-disable camelcase */
import { FC, useState } from "react";
import { Flex, Loader, useMantineColorScheme } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconRosetteDiscountCheckFilled, IconSquareX } from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MantineReactTable, MRT_SortingState, MRT_ColumnFiltersState, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import PopoverCell from "@/components/DataTable/PopoverCell";
import { MainLoader } from "@/components/MainLoader/MainLoader";
import BottomToolbar from "@/components/MainTable/components/bottomToolbar";
import EditRowModalContent from "@/components/MainTable/components/EditRowModalContent";
import RowActions from "@/components/MainTable/components/rowActions";
import TopToolbar from "@/components/MainTable/components/topToolbar";
import CreateRowModalContent from "@/components/MainTable/components/сreateRowModalContent";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";
import DirectoriesStore from "@/store/directoriesStore";
import { userStore } from "@/store/userStore";

import classes from "./MainTable.module.scss";
import { postApiData } from "@/app/api/hooks/fetchTableData";

interface MainTableProperties {
    updateTable: boolean;
    link: string;
}

export const MainTable: FC<MainTableProperties> = ({ updateTable, link }) => {
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [createModalOpened, setCreateModalOpened] = useState(false);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [filter, setFilter] = useState<MRT_ColumnFiltersState>([]);
    const { isEdit, canDelete, canCreate } = userStore();
    const [opened, setOpened] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const debouncedGlobalFilter = useDebouncedValue(globalFilter, 200);
    const debouncedColumnFilter = useDebouncedValue(filter, 200);
    const colorScheme = useMantineColorScheme();
    const handleGlobalFilterChange = (value: string): void => {
        setGlobalFilter(value);
        setPage(1);
    };

    const directoriesStore = new DirectoriesStore();

    interface SortCriteria {
        [key: string]: 'ASC' | 'DESC';
    }
    interface FilterCriteria {
            [key: string]: string ;
    }

    const parametersPost = {
        link: link,
        page: page - 1,
        size: size,
        globalSearchText: debouncedGlobalFilter[0],
        sortCriteria: sorting.reduce<SortCriteria>((acc, sort) => {
            const formattedColumn = sort.id.replaceAll(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
            acc[formattedColumn] = sort.desc ? 'DESC' : 'ASC';
            return acc;
        }, {}),
        columnSearchCriteria: debouncedColumnFilter[0].reduce<FilterCriteria>((acc, columnFilter) => {
            if (columnFilter.value) {
                const formattedColumn = columnFilter.id.replaceAll(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
                acc[formattedColumn] = String(columnFilter.value);
            }
            return acc;
        }, {}),
        dataStatus: "NOT_DELETED",
    };
    const { data, refetch, isFetching, isLoading } = useQuery({
        queryKey: ["apiData", parametersPost],
        queryFn: async () => {
            return postApiData(parametersPost);
        },
        staleTime: 0,
        placeholderData: keepPreviousData,
        // retryDelay: 10000,
    });

    const columns = data?.content[0] ? Object.keys(data.content[0]) : [];

    const translateColumns = (tableColumns: string[], tableLink: string): { accessorKey: string; header: string }[] => {
        const directoryEntry = directoriesStore._directories.find((directory) => directory.link === tableLink);

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
                                    <Loader size="sm" />
                                </div>
                            );
                        }
                        case "ERROR": {
                            return (
                                <div className={classes.statusCell}>
                                    <IconSquareX color={"red"} />
                                </div>
                            );
                        }
                        case "SUCCESS": {
                            return (
                                <div className={classes.statusCell}>
                                    <IconRosetteDiscountCheckFilled color={"green"} />
                                </div>
                            );
                        }
                        // No default
                    }
                }

                return (
                    <div
                        onDoubleClick={() => {
                            if (isEdit) {
                                table.setEditingRow(cell.row);
                            }
                        }}
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

        renderRowActions: ({ row, table }) => <RowActions row={row} table={table} />,
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
        initialState: { density: "xs", showGlobalFilter: true, showColumnFilters:true },
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
                height: "calc(100vh - 192px)",
                overflowY: "auto",
                borderTop: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
            },
        },
        mantineEditRowModalProps: {
            closeOnClickOutside: true,
            withCloseButton: true,
        },
        localization: MRT_Localization_RU,
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

    return data ? (
        <Flex direction={"column"} p={0} m={0} h={"100%"} w={"100%"}>
            <MantineReactTable table={table} />
            <LoadingOverlay visible={isLoading} />
            {updateTable && <UpdateTableModal link={link} opened={opened} close={() => setOpened(false)} />}
        </Flex>
    ) : (
        <MainLoader />
    );
};
