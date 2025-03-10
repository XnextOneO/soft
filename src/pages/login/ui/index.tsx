"use client";

import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useLogin } from "@shared/api/mutation/auth.ts";
import Header from "@shared/components/Header/Header.tsx";
import { useAuthStore } from "@shared/store/authStore.ts";
import { IconAt, IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";

import styles from "./index.module.scss";

export const LoginPage: FC = () => {
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
  const { setTokens } = useAuthStore();
  const { t } = useTranslation(["auth"]);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onLogin = async () => {
    setIsLoginClicked(true);
    // eslint-disable-next-line unicorn/no-null
    setError(null);

    if (!username || !password) {
      console.log("Пожалуйста, введите все необходимые данные для входа.");
      return;
    }

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data, "data");

          const {
            access_token,
            refresh_token,
            expires_in,
            refresh_expires_in,
          } = data;
          setTokens(
            access_token,
            refresh_token,
            expires_in,
            refresh_expires_in,
          );
          router.navigate({ to: "/", replace: true });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (loginError: any) => {
          if (loginError.response && loginError.response.data) {
            const errorMessage =
              loginError.response.data.message[0] || "Неизвестная ошибка";
            setError(errorMessage);
          } else {
            setError("Не удалось выполнить вход");
          }
        },
      },
    );
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  useEffect(() => {
    const isLight = colorScheme.colorScheme === "light";
    setBackgroundState(isLight ? styles.authContainer : styles.darkContainer);
  }, [colorScheme.colorScheme]);

  if (!backgroundState) {
    return <Loader color="green" />;
  }

  return (
    <div className={backgroundState}>
      <Stack gap={0}>
        <Header isBurger={false} isProfile={false} link={false} />
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
            {/* <Group gap="xs" my={20}>
                        <Image src="../../favicon.png" w={40} h={40} alt="IIS Logo" />
                        <Text size="44px" fw={700}>
                            IIS
                        </Text>
                    </Group> */}
            <Text fw={400} size="34px">
              {t("authorization")}
            </Text>
            {error && (
              <Alert
                w="90%"
                radius="md"
                title="Ошибка"
                color="red"
                // onClick={closeError}
              >
                {error}
              </Alert>
            )}
            <TextInput
              w="90%"
              placeholder={t("login-input")}
              label={t("login")}
              error={isLoginClicked && !username ? t("login-required") : ""}
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
              placeholder={t("enter-password")}
              label={t("password")}
              error={isLoginClicked && !password ? t("password-required") : ""}
              inputWrapperOrder={["label", "input", "error"]}
              radius="md"
              type={showPassword ? "text" : "password"}
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
                  {showPassword ? (
                    <IconEyeOff size={16} />
                  ) : (
                    <IconEye size={16} />
                  )}
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
                {t("sign-in")}
              </Button>
            </Group>
            <Text c="dimmed" size="sm">
              © ОАО «АСБ Беларусбанк», {currentYear}
            </Text>
          </Group>
        </Card>
      </Stack>
    </div>
  );
};
