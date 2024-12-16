"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Container, Stack, Title, useMantineColorScheme } from "@mantine/core";

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
                <Stack className={classes.stackContainer}>
                    <Title>{t("main-page")}</Title>
                    <Link href="/directories">
                        <Button color="#006040">{t("directories")}</Button>
                    </Link>
                </Stack>
            </Container>
        </Stack>
    );
};

export default HomePage;
