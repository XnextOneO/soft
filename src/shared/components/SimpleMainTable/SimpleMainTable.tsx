import { FC, JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  Container,
  Flex,
  Group,
  Image,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { MRT_Localization_BY } from "@public/locales/MRT_Localization_BY.ts";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import PopoverCell from "@shared/components/MainTable/components/PopoverCell.tsx";
import {
  MantineReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.esm.mjs";

import styles from "./SimpleMainTable.module.scss";

interface SimpleMainTableProperties {
  headerTitle: string;
  headerIcon?: string;
  width: string;
}
export const SimpleMainTable: FC<SimpleMainTableProperties> = ({
  headerTitle,
  headerIcon,
  width,
}) => {
  const [localization, setLocalization] = useState(MRT_Localization_RU);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [filter, setFilter] = useState<MRT_ColumnFiltersState>([]);
  const debouncedColumnFilter = useDebouncedValue(filter, 200);
  const colorScheme = useMantineColorScheme();
  const { i18n } = useTranslation();
  // eslint-disable-next-line unicorn/no-null
  const [error] = useState<string | null>(null);

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
  const data = {
    content: [
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "Agricultural Bank of China (ABC)",
      },
      {
        country: "CN",
        bankCode: "BKCHCNBJS00",
        bankName: "Bank of China",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "KLB",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "Agricultural Bank of China (ABC)",
      },
      {
        country: "CN",
        bankCode: "BKCHCNBJS00",
        bankName: "Bank of China",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "KLB",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "Agricultural Bank of China (ABC)",
      },
      {
        country: "CN",
        bankCode: "BKCHCNBJS00",
        bankName: "Bank of China",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "KLB",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "Agricultural Bank of China (ABC)",
      },
      {
        country: "CN",
        bankCode: "BKCHCNBJS00",
        bankName: "Bank of China",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "KLB",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "Agricultural Bank of China (ABC)",
      },
      {
        country: "CN",
        bankCode: "BKCHCNBJS00",
        bankName: "Bank of China",
      },
      {
        country: "CN",
        bankCode: "ABOCCNBJ090",
        bankName: "KLB",
      },
    ],
  };

  const columns = data?.content[0] ? Object.keys(data.content[0]) : [];

  const translateColumns = (
    tableColumns: string[],
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ): { accessorKey: string; header: string }[] => {
    return tableColumns.map((column) => {
      return {
        accessorKey: column,
        header: column,
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

  const columnsWithAccessorKey = translateColumns(columns);

  const processedColumns = columnsWithAccessorKey.map((column) => {
    return {
      ...column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cell: ({ cell }: { cell: any }): JSX.Element => {
        const cellValue = cell.getValue();

        return (
          <div>
            <PopoverCell>{cellValue}</PopoverCell>
          </div>
        );
      },
      size: column.header.length > 7 ? 160 : 100,
      sortDescFirst: true,
    };
  });
  console.log(columns);

  const table = useMantineReactTable({
    enableFilters: true,
    columns: processedColumns,
    data: cellValues,
    state: {
      // isLoading: isLoading,
      // showProgressBars: isFetching,
      sorting,
    },
    initialState: {
      density: "xs",
      // showGlobalFilter: true,
      // showColumnFilters: false,
    },
    mantineTableBodyCellProps: {
      h: "35px",
      p: "4px 10px",
    },
    mantineLoadingOverlayProps: {
      loaderProps: { color: "#006040", type: "bars" },
    },
    mantineTableContainerProps: {
      style: {
        height: "35vh",
        overflowY: "auto",
      },
    },
    localization: localization,
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
    mantineTableProps: {
      striped: "even",
      withColumnBorders: true,
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
    <Flex direction={"column"} style={{ width: width }}>
      <Accordion
        chevronPosition="right"
        variant="contained"
        defaultValue={"table"}
        classNames={{ content: styles.content, chevron: styles.chevron }}
      >
        <Accordion.Item value={"table"} p={0}>
          <Accordion.Control
            bg={colorScheme.colorScheme === "light" ? "#999999" : "#777778"}
            style={{ borderRadius: "0" }}
          >
            <Container p={0} mr={"sm"}>
              <Group align={"center"} wrap={"nowrap"}>
                {headerIcon && <Image w={20} h={20} src={headerIcon} />}
                <Text
                  c={
                    colorScheme.colorScheme === "light" ? "#FFFFFF" : "#CCCCCC"
                  }
                >
                  {headerTitle}
                </Text>
              </Group>
            </Container>
          </Accordion.Control>
          <Accordion.Panel>
            <MantineReactTable table={table} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {/*<LoadingOverlay visible={isLoading} />*/}
    </Flex>
  ) : (
    <MainLoader />
  );
};
