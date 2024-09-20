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
import makeError from "make-error";

import classes from "../Auth.module.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setShowAlert] = useState(false);
  const [, setAlertMessage] = useState("");
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onLogin = async () => {
    setIsLoginClicked(true);

    if (!email || !password) {
      setAlertMessage("Please enter all the required data to login.");
      setShowAlert(true);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    try {
      setAlertMessage("");
      setShowAlert(false);
      // const data = await login(email, password)
      // if(data){
      //     user.setUser(data);
      //     user.setIsAuth(true);
      //     navigate(ALL_BEATS_ROUTE);
      // }
      router.push("/directories");
    } catch (error: any) {
      setAlertMessage(error.response.data.message);
      setShowAlert(true);
    }
  };
  const closeError = () => {
    setAlertMessage("");
    setShowAlert(false);
    setIsLoginClicked(false);
  };

  useEffect(() => {
    colorScheme.colorScheme === "light"
      ? setBackgroundState(classes.authContainer)
      : setBackgroundState(classes.darkContainer);
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
            error={isLoginClicked && !email ? "Логин обязателен" : ""}
            inputWrapperOrder={["label", "input", "error"]}
            value={email}
            radius="md"
            leftSection={<IconAt size={16} />}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group w="90%" my={10}>
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
