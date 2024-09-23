"use client";

import { useContext } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Breadcrumbs, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

import { Context } from "@/app/providers";
import DataTable from "@/components/DataTable/DataTable";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";

import classes from "../Directories.module.css";

const DirectoryPage = observer(
  ({ params }: { params: { slug: Array<string> } }) => {
    const { directoriesStore } = useContext(Context);
    if (
      !directoriesStore.directories.some((directory) => {
        return directory.link === params.slug.join("/");
      })
    ) {
      redirect("/not-found");
    }

    // console.log(useRouter().query);
    const colorScheme = useMantineColorScheme();
    const [opened, { open, close }] = useDisclosure(false);

    const breadcrumbs = [
      { title: "Главная страница IIS Беларусбанк", href: "/" },
      { title: "Справочники", href: "/directories" },
      {
        title: `${
          directoriesStore.directories.find((directory) => {
            return directory.link === params.slug.join("/");
          })?.name
        }`,
        href: `${params.slug.join("/")}`,
      },
    ].map((item, index) => (
      <Link key={index} href={item.href} style={{ textDecoration: "none" }}>
        <Text
          c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
          size="sm"
          className={classes.breadcrumbsItem}
        >
          {item.title}
        </Text>
      </Link>
    ));

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
          <Breadcrumbs
            separator=">"
            separatorMargin="5px"
            p="xs"
            style={{
              borderBottom: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
            }}
          >
            {breadcrumbs}
          </Breadcrumbs>

          <DataTable slug={params.slug.join("/")} onOpen={open} />
        </Flex>
        <UpdateTableModal
          link={params.slug.join("/")}
          opened={opened}
          close={close}
        />
      </>
    );
  },
);

export default DirectoryPage;
