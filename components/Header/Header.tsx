"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Burger, Container, Flex, Group, Image as MantineImage, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

import { Context } from "../Providers/AppContextProvider";

import ProfileButton from "./ProfileButton/ProfileButton";
import classes from "./Header.module.scss";

interface HeaderProperties {
    isBurger: boolean;
    isProfile: boolean;
}
const Header: React.FC<HeaderProperties> = observer(({ isBurger, isProfile }) => {
    const [opened, { toggle }] = useDisclosure();
    const { burgerStore } = useContext(Context);
    const pathname = usePathname();
    const t = useTranslations("header");
    useEffect(() => {
        if (!pathname.includes("/login")) {
            burgerStore.setOpened(opened);
        }
    }, [burgerStore, opened, pathname]);

    return (
        <Container className={classes.headerContainer} fluid p={0}>
            <Flex w="100%" h="100%" direction="row">
                {isBurger && (
                    <Flex
                        justify="center"
                        align="center"
                        className={classes.buttonContainer}
                        onClick={toggle}
                        w={52}
                        miw={52}
                    >
                        <Burger
                            size="sm"
                            color="white"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            opened={opened}
                            aria-label={t("navigation")}
                        />
                    </Flex>
                )}
                <Group justify="space-between" w="100%" pl="md">
                    <Link href={"/"}>
                        <Group gap="xs">
                            <MantineImage src="../../favicon.png" w={30} h={30} alt="logo" />
                            <Text c="white" size="20px" fw={700} className={classes.title}>
                                IIS {t("belarusbank")}
                            </Text>
                        </Group>
                    </Link>
                    <Group gap={0} justify="flex-end" align="center">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                        {isProfile && <ProfileButton />}
                    </Group>
                </Group>
            </Flex>
        </Container>
    );
});

export default Header;
