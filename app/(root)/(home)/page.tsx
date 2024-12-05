"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

import classes from "./HomePage.module.css";

const HomePage: FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");

  useEffect(() => {
    if (colorScheme.colorScheme === "light") {
      setBackgroundState(classes.mainContainerLight);
    } else {
      setBackgroundState(classes.mainContainerDark);
    }
  }, [colorScheme.colorScheme]);

  return (
    <Stack gap={0} w="100%">
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
