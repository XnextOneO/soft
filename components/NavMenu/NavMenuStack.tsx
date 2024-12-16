import React from "react";
import Link from "next/link";
import { Stack, UnstyledButton } from "@mantine/core";

import DirectoriesMenu from "../DirectoriesMenu/DirectoriesMenu";

import NavMenuButtonStack from "./NavMenuButtonStack";
import { IconFileAnalytics, IconFolders, IconHelp } from "@tabler/icons-react";

interface INavMenuStackProperties {
    colorScheme: string;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    width: number;
    opened: boolean;
    marginLeft: number;
}

const NavMenuStack: React.FC<INavMenuStackProperties> = ({
    colorScheme,
    active,
    setActive,
    width,
    opened,
    marginLeft,
}) => {
    return (
        <Stack
            w={width}
            gap={0}
            style={{
                borderRight: `1px solid ${colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
            }}
            h="100%"
        >
            <DirectoriesMenu onOpen={setActive}>
                <UnstyledButton
                    onClick={() => {
                        setActive(!active);
                    }}
                >
                    <NavMenuButtonStack
                        colorScheme={colorScheme}
                        active={active}
                        width={width}
                        marginLeft={marginLeft}
                        icon={IconFolders}
                    >
                        {opened ? "Справочники" : ""}
                    </NavMenuButtonStack>
                </UnstyledButton>
            </DirectoriesMenu>
            <Link href="/statuses" style={{ color: colorScheme === "dark" ? "#c9c9c9" : "black" }}>
                <NavMenuButtonStack
                    colorScheme={colorScheme}
                    width={width}
                    marginLeft={marginLeft}
                    icon={IconFileAnalytics}
                >
                    {opened ? "Статусы" : ""}
                </NavMenuButtonStack>
            </Link>
            <NavMenuButtonStack
                colorScheme={colorScheme}
                width={width}
                marginLeft={marginLeft}
                icon={IconHelp}
            >
                {opened ? "Помощь" : ""}
            </NavMenuButtonStack>
        </Stack>
    );
};

export default NavMenuStack;
