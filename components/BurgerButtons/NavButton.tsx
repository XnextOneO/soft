import { Flex, MantineStyleProps, UnstyledButton } from "@mantine/core";
import React from "react";

interface NavButtonProps {
	w: number | string; 
	className?: string;
	children: React.ReactNode;
}

const NavButton = ({ children, className, ...rest }: NavButtonProps) => {
	return (
		<Flex align="center" className={className} {...rest}>
			{children}
		</Flex>
	);
};

export default NavButton;
