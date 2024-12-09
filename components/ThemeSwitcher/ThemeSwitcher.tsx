"use client";

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import classes from "./ThemeSwitcher.module.scss";

const ThemeSwitcher: React.FC = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <ActionIcon
            style={{
                position: "absolute",
                top: "94.9vh",
                left: "4.5px",
                zIndex: 1000,
            }}
            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
            variant="default"
            size="xl"
            radius="xl"
            aria-label="Toggle color scheme"
        >
            {computedColorScheme === "dark" ? (
                <IconSun className={classes.icon} stroke={1.5} />
            ) : (
                <IconMoon className={classes.icon} stroke={1.5} />
            )}
        </ActionIcon>
    );
};

export default ThemeSwitcher;
