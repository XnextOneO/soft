import React, { useContext, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { Context } from "../Providers/AppContextProvider";

const DropdownMenu = observer(
    ({ onOpen, children }: { onOpen: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode }) => {
        const { directoriesStore } = useContext(Context);
        const [directories, setDirectories] = useState(directoriesStore.directories);
        const t = useTranslations("directories-menu");

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
                offset={0}
                radius="xs"
                width={450}
                transitionProps={{ transition: "rotate-right", duration: 150 }}
                position="right-start"
                styles={{ dropdown: { maxHeight: 300, overflowY: "auto" } }}
            >
                <Menu.Target>{children}</Menu.Target>

                <Menu.Dropdown style={{ boxShadow: "0px 6px 35px 6px rgba(48, 48, 48, 0.2)" }}>
                    <TextInput
                        p="xs"
                        w="100%"
                        placeholder={t("search-by-directories")}
                        onClick={handleItemClick}
                        onChange={(event) => searchDirectoryByName(event.target.value)}
                    />
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
                </Menu.Dropdown>
            </Menu>
        );
    },
);

export default DropdownMenu;
