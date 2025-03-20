import { FC } from "react";
import { Flex } from "@mantine/core";
import { MainTable } from "@shared/components/MainTable/MainTable.tsx";
import { useParams } from "@tanstack/react-router";

export const DirectoriesPage: FC = () => {
  const parameters = useParams({ from: "/directories/$slug" });
  const link = parameters.slug || "";
  return (
    <Flex direction="column" p={0} gap={0} w="100%" h="100%">
      <MainTable link={link} updateTable={true} />
    </Flex>
  );
};
