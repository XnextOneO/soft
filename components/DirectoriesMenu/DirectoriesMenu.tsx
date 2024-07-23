import { Context } from "@/app/providers";
import { Menu, TextInput, ScrollArea, Divider } from "@mantine/core";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useContext } from "react";

const DirectoriesMenu = observer(
	({
		onOpen,
		children,
	}: {
		onOpen: React.Dispatch<React.SetStateAction<boolean>>;
		children: React.ReactNode;
	}) => {
		const {directoriesStore} = useContext(Context)

		const handleItemClick = (e: React.MouseEvent) => {
			e.stopPropagation();
		};

		return (
			<Menu
				onChange={onOpen}
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
					/>
					<ScrollArea h={300}>
						<Menu.Label>Справочники ЦВ НСИ НБ РБ</Menu.Label>
						<Divider></Divider>
						{directoriesStore.nsiDirectories.map((directory, index) => (
							<Link
								style={{textDecoration: "none"}}
								key={index}
								href={`/directories/${directory.link}`}
							>
								<Menu.Item>{directory.name}</Menu.Item>
							</Link>
						))}
					</ScrollArea>
				</Menu.Dropdown>
			</Menu>
		);
	}
);

export default DirectoriesMenu;
