import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";

import styles from "./index.module.scss";

export const IndexPage: FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");
  const { t } = useTranslation(["register"]);
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
            <Title>{t("main-page")}</Title>
            <Link to={"/"}>
              <Button color="#006040">{t("directories")}</Button>
            </Link>
          </Stack>
          {/* <DatesProvider settings={{ consistentWeeks: true, locale: "ru" }}>
                        {/* <DatePicker />
                        <DateInput
                            // w="20%"
                            leftSection={
                                <SvgButton
                                    fillColor={colorScheme.colorScheme === "light" ? "#333333" : "#FFFFFF"}
                                    SvgIcon={IconCalendar}
                                />
                            }
                            valueFormat="DD MMM YYYY"
                            placeholder="Выберите дату"
                        />
                    </DatesProvider> */}
        </Group>
      </Container>
    </Stack>
  );
};
