import { useContext } from "react";
import { Flex } from "@mantine/core";
import { MainTable } from "@shared/components/MainTable/MainTable.tsx";
import { Context } from "@shared/providers/AppContextProvider.tsx";
import { observer } from "mobx-react-lite";

export const DirectoriesPage = observer(
  ({ params }: { params: { slug: Array<string> } }) => {
    const { directoriesStore } = useContext(Context);
    if (
      !directoriesStore.directories.some((directory) => {
        return directory.link === params.slug.join("/");
      })
    ) {
      console.log("dsa");
    }
    return (
      <>
        <Flex direction="column" p={0} gap={0} w="100%" h="100%">
          <MainTable link={params.slug.join("/")} updateTable={true} />
        </Flex>
      </>
    );
  },
);
