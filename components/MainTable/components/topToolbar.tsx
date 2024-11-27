import { FC } from "react";
import { Button, Flex, Group } from "@mantine/core";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
} from "mantine-react-table";

interface TopToolbarProperties {
  refetch: () => void;
  setOpened: (opened: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  canCreate: boolean;
  updateTable?: boolean;
}

const TopToolbar: FC<TopToolbarProperties> = ({
  refetch,
  setOpened,
  table,
  canCreate,
  updateTable,
}) => {
  return (
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
        {updateTable && (
          <Button
            color="#007458"
            size="sm"
            radius="xs"
            onClick={() => setOpened(true)}
          >
            Обновить таблицу
          </Button>
        )}
        {canCreate ? (
          <Button
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Создать запись
          </Button>
        ) : (
          ""
        )}
      </Group>
      <Flex>
        <MRT_GlobalFilterTextInput table={table} w={"300px"} />
        <MRT_ShowHideColumnsButton table={table} />
      </Flex>
    </Flex>
  );
};

export default TopToolbar;
