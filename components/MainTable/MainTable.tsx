import { FC, useState } from "react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Pagination,
  Popover,
  Stack,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { fetchApiData } from "@/app/api/hooks";
import PopoverCell from "@/components/DataTable/PopoverCell";
import { MainLoader } from "@/components/MainLoader/MainLoader";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";
import { useEditStore } from "@/store/useEditStore";

import classes from "./MainTable.module.css";

// interface TableProperties {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data: any[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   columns: any[];
// }

export const MainTable: FC = () => {
  const [page, setPage] = useState(1);
  const size = 13;
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { isEdit, canDelete } = useEditStore();
  // const [isLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  // const apiData = {
  //   content: [
  //     {
  //       code: "BANK",
  //       name: "Уникальное и однозначное значение, установленное конкретным банком или аналогичным финансовым учреждением для идентификации отношений, определенных между банком и его клиентом",
  //       // eslint-disable-next-line sonarjs/no-duplicate-string
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "CBID",
  //       name: "Уникальный идентификационный номер, присвоенный Центральным банком для идентификации организации (для РБ - БИК)",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "CHID",
  //       name: "Уникальный идентификационный номер, присвоенный клиринговым центром для идентификации организации (для РБ - УНУР)",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "CINC",
  //       name: "Уникальный идентификационный номер, присвоенный уполномоченным органом при регистрации и используемый для идентификации организации (для РБ - ЕГР)",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "COID",
  //       name: "Идентификация организации, присвоенная уполномоченным органом страны (например, корпоративный регистрационный номер)",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "CUST",
  //       name: "Номер, присвоенный эмитентом для идентификации клиента. Номер, присвоенный стороной для идентификации отношений с кредитором или должником",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "DUNS",
  //       name: "Уникальный идентификационный номер, предоставляемый компанией Dun and Bradstreet для идентификации организации",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "EMPL",
  //       name: "Номер, присвоенный регистрирующим органом работодателю",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "GS1G",
  //       name: "Глобальный идентификационный номер. Справочный номер, используемый для идентификации юридических, функциональных или физических лиц в соответствии с правилами схемы нумерации GS1",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "SREN",
  //       name: "Номер SIREN -это 9-значный код, присвоенный INSEE, французским Национальным институтом статистики и экономических исследований, для идентификации организации во Франции",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "SRET",
  //       name: "Номер SIRET-это 14-значный код, присвоенный INSEE, французским Национальным институтом статистики и экономических исследований, для идентификации структурной единицы во Франции",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //     {
  //       code: "TXID",
  //       name: "Номер, присвоенный налоговым органом для идентификации организации (для РБ - УНП)",
  //       additionDate: "2024-11-06T07:14:06.777+00:00",
  //     },
  //   ],
  //   page: {
  //     size: 20,
  //     number: 0,
  //     totalElements: 12,
  //     totalPages: 1,
  //   },
  // };
  const parameters = {
    page: 0,
    size: 20,
    sort: "ASC",
    link: "nsi/biss-member",
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["apiData", parameters],
    queryFn: async () => {
      return fetchApiData(parameters);
    },
  });
  const columns = data?.content[0] ? Object.keys(data.content[0]) : [];
  const cellValues = data?.content
    ? data.content.map((item: Record<string, string>) => {
        const object: Record<string, string | boolean> = {};
        for (const key of Object.keys(item)) {
          object[key as string] = item[key as string];
        }
        return object;
      })
    : [];

  const [totalElements] = useState(cellValues.length);

  const columnsWithAccessorKey = columns.map((column) => ({
    accessorKey: column,
    header: column,
  }));

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
          style={{ width: "100%" }}
        >
          <PopoverCell>{cell.getValue()}</PopoverCell>
        </div>
      ),
      size: column.accessorKey.length >= 12 ? 140 : 100,
      sortDescFirst: true,
    };
  });
  const table = useMantineReactTable({
    editDisplayMode: "modal",
    enableEditing: isEdit,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderRowActions: ({ row, table }) => (
      <Flex justify={"center"} align={"center"} gap={"md"}>
        <Tooltip label="Редактирование">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 50,
      },
    },
    mantineLoadingOverlayProps: {
      loaderProps: { color: "#006040", type: "bars" },
    },

    renderTopToolbar: () => (
      <Flex direction={"row"} gap={"md"} p={10} justify={"space-between"}>
        <Group gap="xs">
          <Button
            w={36}
            p={0}
            radius="xs"
            color="#007458"
            onClick={() => refetch()}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0734 13.8074V9.08044C24.0734 8.67834 23.5909 8.48175 23.3139 8.76769L21.7233 10.3582C20.8863 9.52117 19.8749 8.87897 18.7613 8.47739C17.6478 8.07582 16.4593 7.92476 15.2807 8.03497C11.5366 8.37452 8.4538 11.3859 8.04276 15.1299C7.82548 17.2292 8.44217 19.3298 9.75979 20.9786C11.0774 22.6273 12.9903 23.692 15.0859 23.9429C17.1815 24.1939 19.2917 23.611 20.9614 22.32C22.631 21.029 23.7263 19.1334 24.0108 17.0422C24.0734 16.506 23.6534 16.0414 23.1173 16.0414C22.6705 16.0414 22.2952 16.372 22.2416 16.8098C21.8573 19.9284 19.1677 22.341 15.9419 22.2963C12.6268 22.2517 9.8299 19.4548 9.77628 16.1307C9.72267 12.6458 12.5553 9.78636 16.0313 9.78636C17.7559 9.78636 19.3196 10.4923 20.4544 11.6182L18.5869 13.4857C18.3009 13.7717 18.4975 14.2542 18.8996 14.2542H23.6266C23.8768 14.2542 24.0734 14.0576 24.0734 13.8074Z"
                fill="white"
              ></path>
            </svg>
          </Button>
          <Button
            color="#007458"
            size="sm"
            radius="xs"
            onClick={() => setOpened(true)}
          >
            Обновить таблицу
          </Button>
          <Button
            onClick={() => {
              table.setCreatingRow(true); // Открывает модальное окно для создания новой строки
            }}
          >
            Создать запись
          </Button>
        </Group>
        <Flex>
          <MRT_GlobalFilterTextInput table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Flex>
      </Flex>
    ),
    onCreatingRowSave: async ({ exitCreatingMode }) => {
      // setData((prevData) => [...prevData, { ...values, id: newId }]);
      exitCreatingMode(); // Закрывает модальное окно
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderCreateRowModalContent: ({ table, row }) => (
      <Stack>
        <span className={classes.test}>Создать новую запись</span>
        {processedColumns.map((column) => (
          <Flex direction="column" key={column.accessorKey}>
            <Title order={5}>{column.header}</Title>
            <Textarea
              placeholder={`Введите ${column.header}`}
              resize={"vertical"}
            />
          </Flex>
        ))}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),

    renderBottomToolbar: () => (
      <Flex align="center" justify={"space-between"} pt={10} pb={10}>
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
          onChange={setPage}
        />
      </Flex>
    ),

    renderEditRowModalContent: ({ row }) => (
      <Stack mah={"80vh"}>
        <span className={classes.test}>Редактирование</span>
        {row.getAllCells().map((cell) => {
          return typeof cell.getValue() === "number" ||
            typeof cell.getValue() === "string" ? (
            <Flex direction={"column"} gap={"0"} key={cell.id}>
              <Title order={5}>{cell.column.columnDef.header}</Title>
              <Textarea
                defaultValue={cell.getValue() as string}
                resize={"vertical"}
                radius={"md"}
              />
            </Flex>
          ) : (
            <span key={cell.id} />
          );
        })}
        <Flex justify="flex-end" gap={20} pos={"sticky"} bottom={10}>
          <Popover
            position="bottom"
            withArrow
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
          >
            <Popover.Target>
              <Button
                variant="outline"
                color="red"
                onClick={() => setDeleteModalOpened(true)}
                disabled={!canDelete}
              >
                Удалить
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <span>Вы уверены, что хотите удалить эту запись?</span>
              <Group mt="lg">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpened(false)}
                >
                  Отмена
                </Button>
                <Button onClick={handleDelete}>Удалить</Button>
              </Group>
            </Popover.Dropdown>
          </Popover>
          <Button
            onClick={() =>
              notifications.show({
                title: "Default notification",
                message: "Do not forget to star Mantine on GitHub! 🌟",
                position: "bottom-right",
              })
            }
          >
            Сохранить
          </Button>
        </Flex>
      </Stack>
    ),
    mantineEditRowModalProps: {
      closeOnClickOutside: true,
      withCloseButton: true,
    },
    columns: processedColumns,
    data: cellValues.slice((page - 1) * size, page * size),
    localization: MRT_Localization_RU,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowSelection: false,
    enableBatchRowSelection: false,
    enablePagination: false,
    enableColumnResizing: true,
    // enableColumnVirtualization: true,
    memoMode: "table-body",
    layoutMode: "grid",
    mantineTableProps: {
      striped: "even",
      withColumnBorders: true,
    },
    state: {
      showProgressBars: isLoading,
      isLoading,
    },
    initialState: { density: "xs", showGlobalFilter: true },
    mantineEditTextInputProps: {
      variant: "filled",
      radius: "md",
      size: "md",
      type: "text",
    },
  });

  const handleDelete = (): void => {
    setDeleteModalOpened(false);
  };

  return (
    <Flex direction={"column"} gap={12} justify={"flex-start"} p={0} h={"90vh"}>
      {isLoading ? <MainLoader /> : <MantineReactTable table={table} />}
      <UpdateTableModal
        link={"a"}
        opened={opened}
        close={() => setOpened(false)}
      />
    </Flex>
  );
};
