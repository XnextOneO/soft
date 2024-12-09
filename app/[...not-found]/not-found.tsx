"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Image, Stack, Title, useMantineColorScheme } from "@mantine/core";

import classes from "./NotFound.module.scss";

export default function NotFound(): JSX.Element {
    const colorScheme = useMantineColorScheme();
    const t = useTranslations("not-found");

    return (
        <>
            <div
                className={
                    colorScheme.colorScheme === "light" ? classes.notFoundContainer : classes.notFoundDarkContainer
                }
            >
                <Stack justify="center" align="center">
                    <Image src="../../assets/error404.png" alt="Picture of the author" />
                    <Title size={48} mt={48}>
                        {t("title")}
                    </Title>
                    <Link href={"/"} className={classes.backLink}>
                        {t("go-to-home")}
                    </Link>
                </Stack>
            </div>
        </>
    );
}
