import { FC } from "react";
import { Flex, Stack, Textarea, Title } from "@mantine/core";
import { MRT_EditActionButtons } from "mantine-react-table";

interface CreateRowModalContentProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processedColumns: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes: any;
}

const CreateRowModalContent: FC<CreateRowModalContentProperties> = ({
  table,
  row,
  processedColumns,
  classes,
}) => {
  return (
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
  );
};

export default CreateRowModalContent;
