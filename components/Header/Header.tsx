"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Burger, Container, Flex, Group, Image, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";

import { logout } from "@/app/api/auth/authAPI";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { useEditStore } from "@/store/useEditStore";

import { Context } from "../Providers/AppContextProvider";

import ProfileButton from "./ProfileButton/ProfileButton";
import classes from "./Header.module.scss";

const Header: React.FC = observer(() => {
    const [opened, { toggle }] = useDisclosure();
    const { burgerStore } = useContext(Context);
    const pathname = usePathname();
    const router = useRouter();
    const { clearStore } = useEditStore();
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
                        aria-label="Навигация"
                    />
                </Flex>
                <Group justify="space-between" w="100%" pl="md">
                    <Link href={"/"}>
                        <Group gap="xs">
                            <Image src="../../favicon.png" w={30} h={30} alt="logo" />
                            <Text c="white" size="24px" fw={700} className={classes.title}>
                                IIS Беларусбанк
                            </Text>
                        </Group>
                    </Link>
                    <Group justify="flex-end" align="center" gap={0}>
                        <ProfileButton />
                        <ThemeSwitcher />
                        <UnstyledButton w={60} h={60} className={classes.buttonContainer} onClick={logoutHandler}>
                            <Flex justify="center">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.8276 2.1175C12.3501 1.96074 12.9021 1.92831 13.4394 2.02281C13.9768 2.1173 14.4846 2.33609 14.9223 2.66173C15.36 2.98736 15.7156 3.41082 15.9606 3.8983C16.2055 4.38577 16.3332 4.92377 16.3333 5.46934V22.5307C16.3332 23.0762 16.2055 23.6142 15.9606 24.1017C15.7156 24.5892 15.36 25.0126 14.9223 25.3383C14.4846 25.6639 13.9768 25.8827 13.4394 25.9772C12.9021 26.0717 12.3501 26.0393 11.8276 25.8825L4.82759 23.7825C4.1067 23.5662 3.47473 23.1234 3.02541 22.5196C2.5761 21.9158 2.33338 21.1833 2.33325 20.4307V7.56934C2.33338 6.81672 2.5761 6.08418 3.02541 5.4804C3.47473 4.87662 4.1067 4.43376 4.82759 4.2175L11.8276 2.1175ZM17.4999 4.66667C17.4999 4.35725 17.6228 4.0605 17.8416 3.84171C18.0604 3.62292 18.3572 3.5 18.6666 3.5H22.1666C23.0948 3.5 23.9851 3.86875 24.6415 4.52513C25.2978 5.18151 25.6666 6.07174 25.6666 7V8.16667C25.6666 8.47609 25.5437 8.77283 25.3249 8.99163C25.1061 9.21042 24.8093 9.33334 24.4999 9.33334C24.1905 9.33334 23.8938 9.21042 23.675 8.99163C23.4562 8.77283 23.3333 8.47609 23.3333 8.16667V7C23.3333 6.69058 23.2103 6.39384 22.9915 6.17504C22.7728 5.95625 22.476 5.83334 22.1666 5.83334H18.6666C18.3572 5.83334 18.0604 5.71042 17.8416 5.49163C17.6228 5.27283 17.4999 4.97609 17.4999 4.66667ZM24.4999 18.6667C24.8093 18.6667 25.1061 18.7896 25.3249 19.0084C25.5437 19.2272 25.6666 19.5239 25.6666 19.8333V21C25.6666 21.9283 25.2978 22.8185 24.6415 23.4749C23.9851 24.1313 23.0948 24.5 22.1666 24.5H18.6666C18.3572 24.5 18.0604 24.3771 17.8416 24.1583C17.6228 23.9395 17.4999 23.6428 17.4999 23.3333C17.4999 23.0239 17.6228 22.7272 17.8416 22.5084C18.0604 22.2896 18.3572 22.1667 18.6666 22.1667H22.1666C22.476 22.1667 22.7728 22.0438 22.9915 21.825C23.2103 21.6062 23.3333 21.3094 23.3333 21V19.8333C23.3333 19.5239 23.4562 19.2272 23.675 19.0084C23.8938 18.7896 24.1905 18.6667 24.4999 18.6667ZM10.4999 12.8333C10.1905 12.8333 9.89375 12.9563 9.67496 13.175C9.45617 13.3938 9.33325 13.6906 9.33325 14C9.33325 14.3094 9.45617 14.6062 9.67496 14.825C9.89375 15.0438 10.1905 15.1667 10.4999 15.1667H10.5011C10.8105 15.1667 11.1073 15.0438 11.326 14.825C11.5448 14.6062 11.6678 14.3094 11.6678 14C11.6678 13.6906 11.5448 13.3938 11.326 13.175C11.1073 12.9563 10.8105 12.8333 10.5011 12.8333H10.4999Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M18.6665 14H24.4998M24.4998 14L22.1665 11.6667M24.4998 14L22.1665 16.3334"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Flex>
                        </UnstyledButton>
                    </Group>
                </Group>
            </Flex>
        </Container>
    );
});

export default Header;
