import { FC, useState } from "react";
import { Flex, Pagination } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
// eslint-disable-next-line camelcase
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

interface TableProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  isEdit: boolean;
}

export const MainTable: FC<TableProperties> = ({ data, columns, isEdit }) => {
  const [page, setPage] = useState(1);
  const size = 10;
  const [totalElements] = useState(data.length);

  const table = useMantineReactTable({
    editDisplayMode: "modal",
    enableEditing: isEdit,
    columns: columns,
    data: data.slice((page - 1) * size, page * size),
    // eslint-disable-next-line camelcase
    localization: MRT_Localization_RU,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    mantineTableProps: {
      striped: "even",
      withColumnBorders: true,
    },
    initialState: { density: "xs", showGlobalFilter: true },
  });

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };
  return (
    <div>
      <MantineReactTable table={table} />
      <Flex gap="xs" align="center" justify={"space-between"}>
        <span>
          Отображены записи {(page - 1) * size + 1}–
          {Math.min(page * size, totalElements)} из {totalElements}
        </span>
        <Pagination
          color="#007458"
          total={Math.ceil(totalElements / size)}
          siblings={1}
          value={page}
          defaultValue={page}
          onChange={handlePageChange}
        />
      </Flex>
    </div>
  );
};
