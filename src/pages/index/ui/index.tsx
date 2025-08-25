import { FC, useEffect, useState } from "react";
import { Container, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import IconCalendar from "@public/assets/calendar.svg";
import {
  getWeekends,
  WeekendDaysResponse,
} from "@shared/api/mutation/calendarAPI.ts";
import { checkApiData } from "@shared/api/query/check.ts";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import NewsComponent from "@shared/components/NewsComponent/NewsComponent.tsx";
import { SimpleMainTable } from "@shared/components/SimpleMainTable/SimpleMainTable.tsx";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

export const IndexPage: FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");

  const { data } = useQuery({ queryKey: ["check"], queryFn: checkApiData });
  console.log(data);
  const { data: weekendDays } = useQuery<WeekendDaysResponse>({
    queryKey: ["getWeekends"],
    queryFn: () => getWeekends(2),
  });

  useEffect(() => {
    if (colorScheme.colorScheme === "light") {
      setBackgroundState(styles.mainContainerLight);
    } else {
      setBackgroundState(styles.mainContainerDark);
    }
  }, [colorScheme.colorScheme]);

  const matches = useMediaQuery("(min-width: 1410px)");
  if (!weekendDays) {
    return <MainLoader />;
  }
  const keys = weekendDays ? Object.keys(weekendDays) : [];
  const firstKeyData = keys.length > 0 ? weekendDays[keys[0]] : [];
  const secondKeyData = keys.length > 1 ? weekendDays[keys[1]] : [];

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
                    headerTitle={`Выходные в банках корреспондентах "${keys[0]}"`}
                    width={"25vw"}
                    data={firstKeyData}
                  />
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${keys[1]}"`}
                    width={"25vw"}
                    data={secondKeyData}
                  />
                </Group>
              ) : (
                <Stack align={"flex-start"} justify={"flex-start"}>
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${keys[0]}"`}
                    width={"45vw"}
                    data={firstKeyData}
                  />
                  <SimpleMainTable
                    headerIcon={IconCalendar}
                    headerTitle={`Выходные в банках корреспондентах "${keys[1]}"`}
                    width={"45vw"}
                    data={secondKeyData}
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
