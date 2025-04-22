import { FC, useEffect, useState } from "react";
import { Container, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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

  const matches = useMediaQuery("(min-width: 994px)");

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
            <Group
              align={"flex-start"}
              justify={"space-between"}
              w={"100%"}
              h={"100%"}
            >
              {matches ? (
                <Group align={"flex-start"} justify={"flex-start"}>
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${new Date().toLocaleDateString()}"`}
                    width={"25vw"}
                  />
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${tomorrow.toLocaleDateString()}"`}
                    width={"25vw"}
                  />
                </Group>
              ) : (
                <Stack align={"flex-start"} justify={"flex-start"}>
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${new Date().toLocaleDateString()}"`}
                    width={"45vw"}
                  />
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${tomorrow.toLocaleDateString()}"`}
                    width={"45vw"}
                  />
                </Stack>
              )}
              <NewsComponent />
            </Group>
          </Stack>
        </Group>
      </Container>
    </Stack>
  );
};
