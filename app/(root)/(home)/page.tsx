"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Container, Group, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";

import SvgButton from "@/components/SvgWrapper/SvgButton";

import "dayjs/locale/ru";

import IconCalendar from "../../../public/assets/calendar.svg";

import classes from "./HomePage.module.scss";
const HomePage: FC = () => {
    const colorScheme = useMantineColorScheme();
    const [backgroundState, setBackgroundState] = useState<string>("");
    const t = useTranslations("home");
    useEffect(() => {
        if (colorScheme.colorScheme === "light") {
            setBackgroundState(classes.mainContainerLight);
        } else {
            setBackgroundState(classes.mainContainerDark);
        }
    }, [colorScheme.colorScheme]);

    return (
        <Stack>
            <Container fluid className={backgroundState}>
                <Group w="100%" p={20} justify="center">
                    <Stack className={classes.stackContainer}>
                        <Title>{t("main-page")}</Title>
                        <Link href="/directories">
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

export default HomePage;
