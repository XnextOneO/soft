"use client";
import { Flex } from "@mantine/core";

import { MainTable } from "@/components/MainTable/MainTable";

export default function AccountsIIS(): JSX.Element {
  const data = {
    columns: ["ID", "Name", "Age", "City"],
    data: [
      {
        ID: 1,
        Name: "AliceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeAliceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeAliceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeAliceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        Age: 30,
        City: "New York",
      },
      { ID: 2, Name: "Bob", Age: 25, City: "Los Angeles" },
      { ID: 3, Name: "Charlie", Age: 35, City: "Chicago" },
      { ID: 4, Name: "David", Age: 28, City: "Miami" },
    ],
  };

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
        <MainTable data={data.data} columns={data.columns} isEdit={true} />
      </Flex>
    </>
  );
}
