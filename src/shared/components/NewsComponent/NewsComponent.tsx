import { FC } from "react";
import {
  Accordion,
  Card,
  Container,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import IconNews from "@public/assets/news.svg";
import classes from "@shared/components/NewsComponent/NewsComponent.module.scss";
const newsData = [
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
  {
    date: "2025-04-09 10:00",
    title: "Технические работы",
    description: "Система будет недоступна с 10:00 до 12:00.",
  },
  {
    date: "2025-04-10 14:00",
    title: "Обновление системы",
    description: "Внедрение новых функций и улучшений.",
  },
];

const NewsComponent: FC = () => {
  const colorScheme = useMantineColorScheme();
  return (
    <Accordion
      chevronPosition="right"
      variant="contained"
      classNames={{ content: classes.content, chevron: classes.chevron }}
    >
      <Accordion.Item value={"table"} w={350}>
        <Accordion.Control
          bg={colorScheme.colorScheme === "light" ? "#999999" : "#777778"}
        >
          <Container p={0} mr={"sm"}>
            <Group align={"center"}>
              <Image w={20} h={20} src={IconNews} />
              <Text
                c={colorScheme.colorScheme === "light" ? "#FFFFFF" : "#CCCCCC"}
              >
                Информация
              </Text>
            </Group>
          </Container>
        </Accordion.Control>
        <Accordion.Panel>
          <ScrollArea style={{ height: "70vh", overflowY: "auto" }}>
            <Stack gap={5}>
              {newsData.map((item, index) => (
                <Card withBorder key={index}>
                  <Text size="sm" c="dimmed">
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                  <Text fw={700} size="md">
                    {item.title}
                  </Text>
                  <Text size="sm">{item.description}</Text>
                </Card>
              ))}
            </Stack>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default NewsComponent;
