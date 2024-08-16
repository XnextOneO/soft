"use client";

import {
	Anchor,
	Breadcrumbs,
	Card,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Stack,
	Text,
	Title,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import classes from "./Directories.module.css";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/providers";
import Link from "next/link";
import { IconBook } from "@tabler/icons-react";

const DirectoriesPage = observer(() => {
	const { directoriesStore } = useContext(Context);
	const colorScheme = useMantineColorScheme();
	console.log(colorScheme);

	const breadcrumbs = [
		{ title: "Главная страница IIS Беларусбанк", href: "/" },
		{ title: "Справочники", href: "/directories" },
	].map((item, index) => (
		<Link key={index} href={item.href} style={{ textDecoration: "none" }}>
			<Text
				c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
				size="sm"
				className={classes.breadcrumbsItem}
			>
				{item.title}
			</Text>
		</Link>
	));

	return (
		<Stack gap={0} w="100%">
			<Breadcrumbs
				separator=">"
				separatorMargin="5px"
				p="xs"
				style={{
					borderBottom: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
				}}
			>
				{breadcrumbs}
			</Breadcrumbs>
			<Container
				fluid
				className={classes.tableContainer}
				mah="100vh"
				maw="100vw"
				miw={500}
			>
				<Card withBorder radius="md" className={classes.card} my={20}>
					<Card.Section
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						p={0}
						withBorder
						inheritPadding
						w="100%"
					>
						<Group my={10} justify="space-between">
							<Title order={3} className={classes.title}>
								Справочники
							</Title>
						</Group>
					</Card.Section>

					<Title order={4} my={10} className={classes.title}>
						ЦВ НСИ НБ РБ
					</Title>
					<Divider w="100%" mb={20} p={0} />
					<Grid mb={20}>
						{directoriesStore.nsiDirectories.map((dir, index) => (
							<Grid.Col key={index} span={2}>
								<Link
									style={{
										width: "50%",
										textDecoration: "none",
									}}
									href={"/directories/" + dir.link}
								>
									<UnstyledButton className={classes.item}>
										<IconBook
											color={
												colorScheme.colorScheme ===
												"dark"
													? "#c9c9c9"
													: "black"
											}
										/>
										<Text
											size="sm"
											mt={7}
											c={
												colorScheme.colorScheme ===
												"dark"
													? "#c9c9c9"
													: "black"
											}
										>
											{dir.name}
										</Text>
									</UnstyledButton>
								</Link>
							</Grid.Col>
						))}
					</Grid>
					<Card.Section
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
						}}
						p={0}
						withBorder
						inheritPadding
						w="100%"
					>
						<Group
							p={0}
							w="100%"
							my={10}
							justify="space-between"
							wrap="nowrap"
						>
							<Flex justify="center" w="50%">
								<Title order={4} className={classes.title}>
									Российской Федерации
								</Title>
							</Flex>
							<Divider m={0} p={0} orientation="vertical" />
							<Flex justify="center" w="50%">
								<Title order={4} className={classes.title}>
									SWIFT
								</Title>
							</Flex>
						</Group>
					</Card.Section>

					<Group
						p={0}
						w="100%"
						mt={10}
						justify="space-between"
						wrap="nowrap"
					>
						<Flex justify="center" w="50%">
							<Link
								style={{
									width: "50%",
									textDecoration: "none",
								}}
								href={"/directories/rf"}
							>
								<UnstyledButton className={classes.item}>
									<IconBook
										color={
											colorScheme.colorScheme === "dark"
												? "#c9c9c9"
												: "black"
										}
									/>
									<Text
										size="sm"
										mt={7}
										c={
											colorScheme.colorScheme === "dark"
												? "#c9c9c9"
												: "black"
										}
									>
										Справочник БИК Российской Федерации
									</Text>
								</UnstyledButton>
							</Link>
						</Flex>
						<Divider m={0} p={0} orientation="vertical"></Divider>
						<Flex justify="center" w="50%">
							<Link
								style={{
									width: "50%",
									textDecoration: "none",
								}}
								href={"/directories/swift"}
							>
								<UnstyledButton className={classes.item}>
									<IconBook
										color={
											colorScheme.colorScheme === "dark"
												? "#c9c9c9"
												: "black"
										}
									/>
									<Text
										size="sm"
										mt={7}
										c={
											colorScheme.colorScheme === "dark"
												? "#c9c9c9"
												: "black"
										}
									>
										Справочник участников SWIFT
									</Text>
								</UnstyledButton>
							</Link>
						</Flex>
					</Group>
				</Card>
			</Container>
		</Stack>
	);
});

export default DirectoriesPage;
