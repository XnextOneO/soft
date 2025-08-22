import React, { FC, JSX, useEffect, useState } from "react";
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
import IconSort from "@public/assets/IconSort.svg?react";
import IconSortAscending from "@public/assets/IconSortAscending.svg?react";
import IconSortDescending from "@public/assets/IconSortDescending.svg?react";
import { MRT_Localization_BY } from "@public/locales/MRT_Localization_BY.ts";
import { BankData } from "@shared/api/mutation/calendarAPI.ts";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import PopoverCell from "@shared/components/MainTable/components/PopoverCell.tsx";
import {
  ColumnParameters,
  translateColumns,
} from "@shared/components/MainTable/MainTable.tsx";
import SvgButton from "@shared/components/SvgWrapper/SvgButton.tsx";
import {
  MantineReactTable,
  MRT_Icons,
  MRT_Localization,
  MRT_SortingState,
  MRT_TableInstance,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.esm.mjs";

import styles from "./SimpleMainTable.module.scss";

interface SimpleMainTableProperties {
  headerTitle: string;
  headerIcon?: string;
  width: string;
  data: BankData[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLocalization = (i18n: any): MRT_Localization => {
  const [localization, setLocalization] = useState(MRT_Localization_RU);

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

  return localization;
};

const getColumns = (data: BankData[]): string[] =>
  data && data.length > 0 ? Object.keys(data[0]) : [];

const getCellValues = (data: BankData[]): BankData[] =>
  data && data.length > 0
    ? data.map((item: BankData) => {
        const object: BankData = { isoCode: "", bankCode: "", bankName: "" };
        for (const key of Object.keys(item)) {
          object[key as keyof BankData] = item[key as keyof BankData] ?? "";
        }
        return object;
      })
    : [];

const getProcessedColumns = (
  columnsWithAccessorKey: ColumnParameters[],
): ColumnParameters[] =>
  columnsWithAccessorKey.map((column) => ({
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
  }));

const getCustomIcons: Partial<MRT_Icons> = {
  IconArrowsSort: () => <SvgButton SvgIcon={IconSort} fillColor={"#999999"} />,
  IconSortAscending: () => (
    <SvgButton SvgIcon={IconSortAscending} fillColor={"#006040"} />
  ),
  IconSortDescending: () => (
    <SvgButton SvgIcon={IconSortDescending} fillColor={"#006040"} />
  ),
};

const useTableInstance = ({
  columns,
  data,
  sorting,
  setSorting,
  localization,
}: {
  columns: ColumnParameters[];
  data: BankData[];
  sorting: MRT_SortingState;
  setSorting: React.Dispatch<React.SetStateAction<MRT_SortingState>>;
  localization: MRT_Localization;
}): MRT_TableInstance<BankData> =>
  useMantineReactTable({
    icons: getCustomIcons,
    columns,
    data,
    state: { sorting },
    initialState: { density: "xs" },
    mantineTableBodyCellProps: { h: "35px", p: "4px 10px" },
    mantineLoadingOverlayProps: {
      loaderProps: { color: "#006040", type: "bars" },
    },
    mantineTableContainerProps: {
      style: { height: "30vh", overflowY: "auto" },
    },
    localization,
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
    onSortingChange: setSorting,
    isMultiSortEvent: () => true,
  });

export const SimpleMainTable: FC<SimpleMainTableProperties> = ({
  headerTitle,
  headerIcon,
  width,
  data,
}) => {
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const colorScheme = useMantineColorScheme();
  const { i18n } = useTranslation();
  // eslint-disable-next-line unicorn/no-null
  const [error] = useState<string | null>(null);

  const localization = useLocalization(i18n);
  const columns = getColumns(data);
  const cellValues = getCellValues(data);
  const columnsWithAccessorKey: ColumnParameters[] = translateColumns(columns, {
    isoCode: "Стр",
    bankCode: "Код банка",
    bankName: "Наименование банка",
  });
  const processedColumns = getProcessedColumns(columnsWithAccessorKey);

  const table = useTableInstance({
    columns: processedColumns,
    data: cellValues,
    sorting,
    setSorting,
    localization,
  });

  const emptyTable = useTableInstance({
    columns: [],
    data: [],
    sorting,
    setSorting,
    localization,
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

  if (!data || data.length === 0) {
    return (
      <Flex direction={"column"} style={{ width }}>
        <Accordion
          chevronPosition="right"
          variant="contained"
          defaultValue={"table"}
          classNames={{ content: styles.content, chevron: styles.chevron }}
        >
          <Accordion.Item value={"table"} p={0} style={{ borderRadius: "2px" }}>
            <Accordion.Control
              bg={colorScheme.colorScheme === "light" ? "#999999" : "#777778"}
              style={{
                borderTopLeftRadius: "2px",
                borderTopRightRadius: "2px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              <Container p={0} mr={"sm"}>
                <Group align={"center"} wrap={"nowrap"}>
                  {headerIcon && <Image w={20} h={20} src={headerIcon} />}
                  <Text
                    c={
                      colorScheme.colorScheme === "light"
                        ? "#FFFFFF"
                        : "#CCCCCC"
                    }
                  >
                    {headerTitle}
                  </Text>
                </Group>
              </Container>
            </Accordion.Control>
            <Accordion.Panel>
              <MantineReactTable table={emptyTable} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Flex>
    );
  }

  return data ? (
    <Flex direction={"column"} style={{ width }}>
      <Accordion
        chevronPosition="right"
        variant="contained"
        defaultValue={"table"}
        classNames={{ content: styles.content, chevron: styles.chevron }}
      >
        <Accordion.Item value={"table"} p={0} style={{ borderRadius: "2px" }}>
          <Accordion.Control
            bg={colorScheme.colorScheme === "light" ? "#999999" : "#777778"}
            style={{
              borderTopLeftRadius: "2px",
              borderTopRightRadius: "2px",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
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
    </Flex>
  ) : (
    <MainLoader />
  );
};
