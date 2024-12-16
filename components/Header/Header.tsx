"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Box, Burger, Container, Flex, Group, Image as MantineImage, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

import { logout } from "@/app/api/auth/authAPI";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { useEditStore } from "@/store/useEditStore";

import LogoutIcon from "../../public/assets/logout.svg";
import { Context } from "../Providers/AppContextProvider";

import ProfileButton from "./ProfileButton/ProfileButton";
import classes from "./Header.module.scss";

const Header: React.FC = observer(() => {
    const [opened, { toggle }] = useDisclosure();
    const { burgerStore } = useContext(Context);
    const pathname = usePathname();
    const router = useRouter();
    const { clearStore } = useEditStore();
    const t = useTranslations("header");
    useEffect(() => {
        if (!pathname.includes("/login")) {
            burgerStore.setOpened(opened);
        }
    }, [burgerStore, opened, pathname]);

    const logoutHandler = (): void => {
        logout();
        clearStore();
        router.push("/login");
    };

    return (
        <Container className={classes.headerContainer} fluid p={0}>
            <Flex w="100%" h="100%" direction="row">
                <Flex justify="center" align="center" className={classes.buttonContainer} onClick={toggle}>
                    <Burger
                        w={60}
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
                <Group justify="space-between" w="100%" pl="md">
                    <Link href={"/"}>
                        <Group gap="xs">
                            <MantineImage src="../../favicon.png" w={30} h={30} alt="logo" />
                            <Text c="white" size="24px" fw={700} className={classes.title}>
                                IIS {t("belarusbank")}
                            </Text>
                        </Group>
                    </Link>
                    <Group justify="flex-end" align="center" gap={0}>
                        <Box mr={5}>
                            <ThemeSwitcher />
                        </Box>
                        <ProfileButton />
                        <UnstyledButton w={60} h={60} className={classes.buttonContainer} onClick={logoutHandler}>
                            <Flex justify="center">
                                <Image src={LogoutIcon} alt="Logout Icon" />
                            </Flex>
                        </UnstyledButton>
                    </Group>
                </Group>
            </Flex>
        </Container>
    );
});

export default Header;
