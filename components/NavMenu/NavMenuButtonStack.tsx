import { Text } from "@mantine/core";

import CustomIcon from "../BurgerButtons/CustomIcon";
import NavButton from "../BurgerButtons/NavButton";
import classes from "./NavMenu.module.css";

interface INavMenuButtonStackProps {
	colorScheme: string;
	active?: boolean;
	width: number;
	marginLeft: number;
    path: string;
	children?: React.ReactNode;
}

const NavMenuButtonStack: React.FC<INavMenuButtonStackProps> = ({
	colorScheme,
	active,
	width,
	marginLeft,
    path,
	children,
}) => {
	return (
		<NavButton
			className={
				active
					? classes.navIconActive
					: colorScheme === "dark"
						? classes.navIconDark
						: classes.navIcon
			}
			w={width}
		>
			<CustomIcon
				active={active}
				colorScheme={colorScheme}
				path={path}
			/>
			<Text c={active ? "#c9c9c9" : ""} ml={marginLeft}>
				{children}
			</Text>
		</NavButton>
	);
};

export default NavMenuButtonStack;
