"use client";
import { Flex } from "@mantine/core";

import { MainTable } from "@/components/MainTable/MainTable";

export default function AccountsIIS(): JSX.Element {
  return (
    <>
      <Flex
        direction="column"
        p={0}
        gap={0}
        w="100%"
        h="100%"
        style={{ overflow: "hidden" }}
      >
        <MainTable />
      </Flex>
    </>
  );
}
