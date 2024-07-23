"use client";
import {
	Title,
	Text,
	Anchor,
	Button,
	Menu,
	rem,
	Avatar,
	Container,
	Group,
} from "@mantine/core";
import classes from "./Welcome.module.css";
import {
	IconSettings,
	IconMessageCircle,
	IconPhoto,
	IconSearch,
	IconArrowsLeftRight,
	IconTrash,
} from "@tabler/icons-react";
import NavButton from "../BurgerButtons/NavButton";
import Link from "next/link";

export function Welcome() {
	return (
		<>
			<Title className={classes.title} ta="center" mt={50}>
				Добро пожаловать
			</Title>
			<Group w="100%" justify="center">
				<Link href="/directories">
					<Button color="#006040">Справочники</Button>
				</Link>
			</Group>
		</>
	);
}
