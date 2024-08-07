import { Context } from "@/app/providers";
import { Menu, TextInput, ScrollArea, Divider } from "@mantine/core";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useContext, useState } from "react";

const DirectoriesMenu = observer(
	({
		onOpen,
		children,
	}: {
		onOpen: React.Dispatch<React.SetStateAction<boolean>>;
		children: React.ReactNode;
	}) => {
		const { directoriesStore } = useContext(Context);
		const allDirectories = directoriesStore.nsiDirectories.concat(
			directoriesStore.swiftDirectory,
			directoriesStore.rfDirectory
		);
		const [directories, setDirectories] = useState(allDirectories);

		const handleItemClick = (e: React.MouseEvent) => {
			e.stopPropagation();
		};

		const searchDirectoryByName = (value: string) => {
			setDirectories(
				allDirectories.filter((directory) =>
					directory.name.toLowerCase().includes(value.toLowerCase())
				)
			);
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
						onChange={(e) => searchDirectoryByName(e.target.value)}
					/>
					<ScrollArea h={300}>
						{/* <Menu.Label>Справочники ЦВ НСИ НБ РБ</Menu.Label>
						<Divider /> */}

						{directories.map((directory, index) => (
							<Link
								style={{ textDecoration: "none" }}
								key={index}
								href={`/directories/${directory.link}`}
							>
								<Menu.Item>{directory.name}</Menu.Item>
							</Link>
						))}
						{/* <Menu.Label>Справочник Российской Федерации</Menu.Label>
						<Divider />

						<Link
							style={{ textDecoration: "none" }}
							href={`/directories/rf`}
						>
							<Menu.Item>
								{directoriesStore.rfDirectory.name}
							</Menu.Item>
						</Link>
						<Menu.Label>Справочник SWIFT</Menu.Label>
						<Divider />

						<Link
							style={{ textDecoration: "none" }}
							href={`/directories/swift`}
						>
							<Menu.Item>
								{directoriesStore.swiftDirectory.name}
							</Menu.Item>
						</Link> */}
					</ScrollArea>
				</Menu.Dropdown>
			</Menu>
		);
	}
);

export default DirectoriesMenu;
