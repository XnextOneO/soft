import { Text } from "@mantine/core";

import CustomIcon from "../BurgerButtons/CustomIcon";
import NavButton from "../BurgerButtons/NavButton";

import classes from "./NavMenu.module.scss";

interface INavMenuButtonStackProperties {
    colorScheme: string;
    active?: boolean;
    width: number;
    marginLeft: number;
    path: string;
    children?: React.ReactNode;
}

const NavMenuButtonStack: React.FC<INavMenuButtonStackProperties> = ({
    colorScheme,
    active,
    width,
    marginLeft,
    path,
    children,
}) => {
    let navButtonClass;

    if (active) {
        navButtonClass = classes.navButtonActive;
    } else if (colorScheme === "dark") {
        navButtonClass = classes.navButtonDark;
    } else {
        navButtonClass = classes.navButton;
    }

    return (
        <NavButton className={navButtonClass} w={width}>
            <CustomIcon active={active} colorScheme={colorScheme} path={path} />
            <Text c={active ? "#c9c9c9" : ""} ml={marginLeft}>
                {children}
            </Text>
        </NavButton>
    );
};

export default NavMenuButtonStack;
