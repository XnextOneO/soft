"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Group,
  Image,
  Loader,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

import { useLogin } from "@/app/api/hooks/auth";

import classes from "../Auth.module.css";

const LoginPage: React.FC = () => {
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");
  const { mutate } = useLogin();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginClicked, setIsLoginClicked] = useState(false);
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
        onSuccess: (response) => {
          router.push("/");
        },
        onError: (error) => {
          setError(error.message);
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
          />
          <TextInput
            w="90%"
            placeholder="Введите пароль"
            label="Пароль"
            error={isLoginClicked && !password ? "Пароль обязателен" : ""}
            inputWrapperOrder={["label", "input", "error"]}
            radius="md"
            type="password"
            leftSection={<IconLock size={16} />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
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
