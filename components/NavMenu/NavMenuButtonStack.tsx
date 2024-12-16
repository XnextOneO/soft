import { Text } from "@mantine/core";

import CustomIcon from "../BurgerButtons/CustomIcon";
import NavButton from "../BurgerButtons/NavButton";

import classes from "./NavMenu.module.scss";
import { IconFolders } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface INavMenuButtonStackProperties {
    colorScheme: string;
    active?: boolean;
    width: number;
    marginLeft: number;
    icon: React.ElementType;
    children?: React.ReactNode;
}

const NavMenuButtonStack: React.FC<INavMenuButtonStackProperties> = ({
    colorScheme,
    active,
    width,
    marginLeft,
    icon: IconComponent,
    children,
}) => {
    const [iconColorState, setIconColorState] = useState<string>("");

    let navButtonClass;
    let pathColor;

    if (active) {
        navButtonClass = classes.navButtonActive;
        pathColor = "#FFFFFF";
    } else if (colorScheme === "dark") {
        navButtonClass = classes.navButtonDark;
        pathColor = "#FFFFFF";
    } else {
        navButtonClass = classes.navButton;
        pathColor = "#333333";
    }

    useEffect(() => {
        setIconColorState(pathColor);
    }, [active, colorScheme, pathColor]);

    return (
        <NavButton className={navButtonClass} w={width}>
            <IconComponent width={60} height={25} color={iconColorState}/>
            <Text c={active ? "#c9c9c9" : ""} ml={marginLeft}>
                {children}
            </Text>
        </NavButton>
    );
};

export default NavMenuButtonStack;
