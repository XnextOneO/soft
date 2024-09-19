"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumbs,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import classes from "./HomePage.module.css";

const HomePage = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");

  useEffect(() => {
    colorScheme.colorScheme === "light"
      ? setBackgroundState(classes.mainContainerLight)
      : setBackgroundState(classes.mainContainerDark);
  }, [colorScheme.colorScheme]);

  const breadcrumbs = [
    { title: "Главная страница IIS Беларусбанк", href: "/" },
  ].map((item, index) => (
    <Link style={{ textDecoration: "none" }} key={index} href={item.href}>
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
        mah="100vh"
        miw="700px"
        maw="100vw"
        className={backgroundState}
      >
        <Stack w="100%" className={classes.stackContainer}>
          <Title>Главная страница IIS Беларусбанк</Title>

          <Link href="/directories">
            <Button color="#006040">Справочники</Button>
          </Link>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomePage;
