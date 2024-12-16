"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { Flex } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { MainTable } from "@/components/MainTable/MainTable";
import { Context } from "@/components/Providers/AppContextProvider";

const DirectoryPage = observer(({ params }: { params: { slug: Array<string> } }) => {
    const { directoriesStore } = useContext(Context);
    if (
        !directoriesStore.directories.some((directory) => {
            return directory.link === params.slug.join("/");
        })
    ) {
        redirect("/not-found");
    }
    return (
        <>
            <Flex direction="column" p={0} gap={0} w="100%" h="100%">
                <MainTable link={params.slug.join("/")} updateTable={true} />
            </Flex>
        </>
    );
});

export default DirectoryPage;
