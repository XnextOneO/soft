"use client";

import { useContext } from "react";
import React from "react";
import Link from "next/link";
import {
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { observer } from "mobx-react-lite";

import DirectoryList from "@/components/DirectoriesPageParts/DirectoriyList";
import DirectoryItem from "@/components/DirectoriesPageParts/DirectoryItem";
import { useBreadCrumbs } from "@/hooks/breadcrumbs-hooks";

import { Context } from "../../../components/Providers/AppContextProvider";

import classes from "./Directories.module.css";

const DirectoriesPage = observer(() => {
  const { directoriesStore } = useContext(Context);
  const colorScheme = useMantineColorScheme();

  const breadcrumbs = [
    { title: "Главная страница IIS Беларусбанк", href: "/" },
    { title: "Справочники", href: "/directories" },
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
  useBreadCrumbs("Справочники");

  const specialLinks = new Set(["rf", "swift", "scbank/account"]);
  const specialDirectories = directoriesStore.directories.filter((directory) =>
    specialLinks.has(directory.link),
  );

  const nsiDirectories = directoriesStore.directories.filter(
    (directory) => !specialLinks.has(directory.link),
  );

  return (
    <Stack gap={0} w="100%">
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
      <Container
        fluid
        className={classes.tableContainer}
        mah="100vh"
        maw="100vw"
        miw={500}
      >
        <Card withBorder radius="md" className={classes.card} my={20}>
          <Card.Section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            p={0}
            withBorder
            inheritPadding
            w="100%"
          >
            <Group my={10} justify="space-between">
              <Title order={3} className={classes.title}>
                Справочники
              </Title>
            </Group>
          </Card.Section>

          <Title order={4} my={10} className={classes.title}>
            ЦВ НСИ НБ РБ
          </Title>
          <Divider w="100%" mb={20} p={0} />
          <DirectoryList
            directories={nsiDirectories}
            colorScheme={colorScheme.colorScheme}
          />
          <Card.Section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            p={0}
            withBorder
            inheritPadding
            w="100%"
          >
            <Group p={0} w="100%" my={10} justify="space-between" wrap="nowrap">
              {specialDirectories.map((directory, index) => (
                <React.Fragment key={index}>
                  <Flex justify="center" w="50%">
                    <Title order={4} my={10} className={classes.title}>
                      {directory.name}
                    </Title>
                  </Flex>
                  {index < specialDirectories.length - 1 && (
                    <Divider m={0} p={0} orientation="vertical" />
                  )}
                </React.Fragment>
              ))}
            </Group>
          </Card.Section>

          <Group p={0} w="100%" mt={10} justify="space-between" wrap="nowrap">
            {specialDirectories.map((directory, index) => (
              <React.Fragment key={index}>
                <Flex justify="center" w="50%">
                  <DirectoryItem
                    directory={directory}
                    colorScheme={colorScheme.colorScheme}
                  />
                </Flex>
                {index < specialDirectories.length - 1 && (
                  <Divider m={0} p={0} orientation="vertical" />
                )}
              </React.Fragment>
            ))}
          </Group>
        </Card>
      </Container>
    </Stack>
  );
});

export default DirectoriesPage;
