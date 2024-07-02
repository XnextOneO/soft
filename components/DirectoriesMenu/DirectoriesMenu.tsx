import { theme } from "@/theme";
import { Menu, ActionIcon, rem, TextInput, ScrollArea } from "@mantine/core";
import {
	IconChevronDown,
	IconCalendar,
	IconBookmark,
	IconTrash,
} from "@tabler/icons-react";
import React from "react";
import classes from "./DirectoriesMenu.module.css";

const directories = [
	{ name: "Справочник 1" },
	{ name: "Справочник 2" },
	{ name: "Справочник 3" },
	{ name: "Справочник 4" },
	{ name: "Справочник 5" },
	{ name: "Справочник 6" },
	{ name: "Справочник 7" },
	{ name: "Справочник 8" },
	{ name: "Справочник 9" },
	{ name: "Справочник 10" },
];

const DirectoriesMenu = ({ children }: { children: React.ReactNode }) => {
	const handleItemClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Menu
			radius="xs"
			width={450}
			transitionProps={{ transition: "rotate-right", duration: 150 }}
			position="right-start"
		>
			<Menu.Target>{children}</Menu.Target>

			<Menu.Dropdown>
				<TextInput
					p="xs"
					w="100%"
					placeholder="Поиск по справочникам"
					onClick={handleItemClick}
				></TextInput>

				<ScrollArea h={300}>
					{directories.map((directory, index) => (
						<Menu.Item key={index}>{directory.name}</Menu.Item>
					))}
				</ScrollArea>
			</Menu.Dropdown>
		</Menu>
	);
};

export default DirectoriesMenu;
