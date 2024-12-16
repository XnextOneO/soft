"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Group, Image, Loader, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { IconAt, IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";

import { useLogin } from "@/app/api/hooks/auth";

import classes from "../Auth.module.scss";

const LoginPage: React.FC = () => {
    const colorScheme = useMantineColorScheme();
    const [backgroundState, setBackgroundState] = useState<string>("");
    const { mutate } = useLogin();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    // eslint-disable-next-line unicorn/no-null
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const onLogin = async () => {
        setIsLoginClicked(true);

        if (!username || !password) {
            console.log("Please enter all the required data to login.");
            return;
        }

        mutate(
            { username: username, password },
            {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (loginError: Error) => {
                    setError(loginError.message);
                },
            },
        );
    }; // const closeError = () => {
    //   setAlertMessage("");
    //   setShowAlert(false);
    //   setIsLoginClicked(false);
    // };

    useEffect(() => {
        const isLight = colorScheme.colorScheme === "light";
        setBackgroundState(isLight ? classes.authContainer : classes.darkContainer);
    }, [colorScheme.colorScheme]);

    if (!backgroundState) {
        return <Loader color="green" />;
    }

    return (
        <div className={backgroundState}>
            <Card w="25%" py={70} miw={400} shadow="xl" withBorder>
                <Group
                    gap="sm"
                    w="100%"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0",
                    }}
                >
                    <Group gap="xs" my={20}>
                        <Image src="../../favicon.png" w={40} h={40} alt="IIS Logo" />
                        <Text size="44px" fw={700}>
                            IIS
                        </Text>
                    </Group>
                    <Text fw={400} size="34px">
                        Авторизация
                    </Text>
                    <TextInput
                        w="90%"
                        placeholder="Введите логин"
                        label="Логин"
                        error={isLoginClicked && !username ? "Логин обязателен" : ""}
                        inputWrapperOrder={["label", "input", "error"]}
                        value={username}
                        radius="md"
                        leftSection={<IconAt size={16} />}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                onLogin();
                            }
                        }}
                    />
                    <TextInput
                        w="90%"
                        placeholder="Введите пароль"
                        label="Пароль"
                        error={isLoginClicked && !password ? "Пароль обязателен" : ""}
                        inputWrapperOrder={["label", "input", "error"]}
                        radius="md"
                        type={showPassword ? "text" : "password"} // Переключение типа
                        leftSection={<IconLock size={16} />}
                        rightSection={
                            <div
                                onClick={() => setShowPassword((previous) => !previous)}
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                            </div>
                        }
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                onLogin();
                            }
                        }}
                    />{" "}
                    <Group w="90%" my={10}>
                        {error && (
                            <Text color="red" size="sm" mb="sm">
                                {error}
                            </Text>
                        )}
                        <Button
                            variant="filled"
                            radius="xs"
                            color="#008858"
                            w="100%"
                            size="md"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    onLogin();
                                }
                            }}
                            onClick={onLogin}
                        >
                            Войти
                        </Button>
                    </Group>
                    <Text c="dimmed" size="sm">
                        © ОАО «АСБ Беларусбанк», 2024
                    </Text>
                </Group>
            </Card>
        </div>
    );
};

export default LoginPage;
