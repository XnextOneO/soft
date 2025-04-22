import { FC, useEffect, useState } from "react";
import { Container, Group, Stack, useMantineColorScheme } from "@mantine/core";
import IconCalendar from "@public/assets/calendar.svg";
import NewsComponent from "@shared/components/NewsComponent/NewsComponent.tsx";
import { SimpleMainTable } from "@shared/components/SimpleMainTable/SimpleMainTable.tsx";

import styles from "./index.module.scss";

export const IndexPage: FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");
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
          <Stack className={styles.stackContainer} w={"100%"}>
            <Group align={"flex-start"} justify={"space-between"} w={"100%"}>
              <Group align={"flex-start"} justify={"flex-start"} wrap={"wrap"}>
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
              <NewsComponent />
            </Group>
          </Stack>
        </Group>
      </Container>
    </Stack>
  );
};
