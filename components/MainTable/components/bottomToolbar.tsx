import { FC } from "react";
import { Flex, Pagination, Text } from "@mantine/core";

interface BottomToolbarProperties {
  page: number;
  size: number;
  totalElements: number;
  countPages: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: any;
  setPage: (page: number) => void;
}

const BottomToolbar: FC<BottomToolbarProperties> = ({
  page,
  size,
  totalElements,
  countPages,
  parameters,
  setPage,
}) => {
  return (
    <Flex align="center" justify={"space-between"} pt={10} pb={10} w={"100%"}>
      <Text>
        Отображены записи {(page - 1) * size + 1}–
        {Math.min(page * size, totalElements)} из {totalElements}
      </Text>
      <Pagination
        color="#007458"
        total={countPages}
        value={parameters.page + 1}
        defaultValue={parameters.page}
        onChange={setPage}
      />
    </Flex>
  );
};

export default BottomToolbar;
