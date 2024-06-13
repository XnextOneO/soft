import { theme } from "@/theme";
import { Menu, ActionIcon, rem } from "@mantine/core";
import {
	IconChevronDown,
	IconCalendar,
	IconBookmark,
	IconTrash,
} from "@tabler/icons-react";
import React from "react";
import classes from "./Directoriesmenu.module.css"

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

const DirectoriesMenu = ({children} : {children: React.ReactNode}) => {
	return (
		<Menu
			transitionProps={{ transition: "pop" }}
			position="right-start"
			withinPortal
		>
			<Menu.Target>
				{children}
			</Menu.Target>
			<Menu.Dropdown>
				{directories.map((directory, index) => (
					<Menu.Item key={index}>{directory.name}</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
};

export default DirectoriesMenu;
