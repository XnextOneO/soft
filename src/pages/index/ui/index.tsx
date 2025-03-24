import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

import styles from "./index.module.scss";

export const IndexPage: FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");
  const { t } = useTranslation(["home"]);
  useEffect(() => {
    if (colorScheme.colorScheme === "light") {
      setBackgroundState(styles.mainContainerLight);
    } else {
      setBackgroundState(styles.mainContainerDark);
    }
  }, [colorScheme.colorScheme]);

  return (
    <Stack>
      <Container fluid className={backgroundState}>
        <Group w="100%" p={20} justify="center">
          <Stack className={styles.stackContainer}>
            <Title>{t("home:home.main-page")}</Title>
          </Stack>
        </Group>
      </Container>
    </Stack>
  );
};
