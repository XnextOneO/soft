"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "../Auth.module.css";

import {
	Button,
	Group,
	TextInput,
	Text,
	Image,
	Anchor,
	Card,
	useMantineColorScheme,
} from "@mantine/core";
import {
	IconAt,
	IconExclamationCircle,
	IconLock,
	IconUser,
} from "@tabler/icons-react";

const LoginPage: React.FC = () => {
	const router = useRouter();
	const colorScheme = useMantineColorScheme();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isLoginClicked, setIsLoginClicked] = useState(false);
	const onLogin = async () => {
		setIsLoginClicked(true);

		if (!email || !password) {
			setAlertMessage("Please enter all the required data to login.");
			setShowAlert(true);
			return;
		}
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
		} catch (err: any) {
			setAlertMessage(err.response.data.message);
			setShowAlert(true);
		}
	};
	const closeError = () => {
		setAlertMessage("");
		setShowAlert(false);
		setIsLoginClicked(false);
	};

	return (
		<div
			className={
				colorScheme.colorScheme === "light"
					? classes.authContainer
					: classes.darkContainer
			}
		>
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
						<Image src="../../favicon.png" w={40} h={40} alt="IIS Logo"/>
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
						error={
							isLoginClicked && !email ? "Логин обязателен" : ""
						}
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
						error={
							isLoginClicked && !password
								? "Пароль обязателен"
								: ""
						}
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
					<Text c="dimmed" size="sm">© ОАО «АСБ Беларусбанк», 2024</Text>
				</Group>
			</Card>
		</div>
	);
};

export default LoginPage;
