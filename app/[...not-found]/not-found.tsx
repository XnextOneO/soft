"use client";
import { Image, Stack, Title, useMantineColorScheme } from "@mantine/core";

import classes from "./NotFound.module.css";
// import { useRouter } from "next/navigation";

export default function NotFound() {
	// const router = useRouter();
	const colorScheme = useMantineColorScheme();

	return (
		<>
			<div
				className={
					colorScheme.colorScheme === "light"
						? classes.notFoundContainer
						: classes.notFoundDarkContainer
				}
			>
				<Stack justify="center" align="center">
					<Image
						src="../../assets/error404.png"
						alt="Picture of the author"
					/>
					<Title size={48} mt={48}>Страница не найдена</Title>
				</Stack>
			</div>
		</>
	);
}
