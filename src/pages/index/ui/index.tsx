import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import IconCalendar from "@public/assets/calendar.svg";
import { SimpleMainTable } from "@shared/components/SimpleMainTable/SimpleMainTable.tsx";

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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Stack>
      <Container fluid className={backgroundState}>
        <Group
          align={"flex-start"}
          justify={"flex-start"}
          w="100%"
          h={"100%"}
          p={20}
        >
          <Stack className={styles.stackContainer}>
            <Group align={"flex-start"} justify={"flex-start"}>
              {/*<Title>{t("home:home.main-page")}</Title>*/}
              <SimpleMainTable
                headerIcon={IconCalendar}
                headerTitle={`Выходные в банках корреспондентах "${new Date().toLocaleDateString()}"`}
              />
              <SimpleMainTable
                headerIcon={IconCalendar}
                headerTitle={`Выходные в банках корреспондентах "${tomorrow.toLocaleDateString()}"`}
              />
            </Group>
          </Stack>
        </Group>
      </Container>
    </Stack>
  );
};
