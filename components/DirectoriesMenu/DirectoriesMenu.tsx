import React, { useContext, useState } from "react";
import Link from "next/link";
import { Menu, ScrollArea, TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { Context } from "../Providers/AppContextProvider";

const DirectoriesMenu = observer(
    ({ onOpen, children }: { onOpen: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode }) => {
        const { directoriesStore } = useContext(Context);
        const [directories, setDirectories] = useState(directoriesStore.directories);

        const handleItemClick = (event: React.MouseEvent): void => {
            event.stopPropagation();
        };

        const searchDirectoryByName = (value: string): void => {
            setDirectories(
                directoriesStore.directories.filter((directory) =>
                    directory.name.toLowerCase().includes(value.toLowerCase()),
                ),
            );
        };

        const resetDirectories = (): void => {
            setDirectories(directoriesStore.directories);
        };

        return (
            <Menu
                onChange={(value) => {
                    onOpen(value);
                    if (!value) {
                        setDirectories(directoriesStore.directories);
                    }
                }}
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
                        onChange={(event) => searchDirectoryByName(event.target.value)}
                    />
                    <ScrollArea h={300}>
                        {directories.map((directory, index) => (
                            <Link
                                style={{ textDecoration: "none" }}
                                key={index}
                                href={`/directories/${directory.link}`}
                                onClick={() => {
                                    resetDirectories();
                                }}
                            >
                                <Menu.Item>{directory.name}</Menu.Item>
                            </Link>
                        ))}
                    </ScrollArea>
                </Menu.Dropdown>
            </Menu>
        );
    },
);

export default DirectoriesMenu;
