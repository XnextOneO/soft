import { Flex, UnstyledButton } from "@mantine/core";
import React from "react";

interface NavButtonProps {
	className?: string;
	children: React.ReactNode;
}

const NavButton = ({ children, className, ...rest }: NavButtonProps) => {
	return (
		<Flex p="sm" align="center" className={className} {...rest}>
			{children}
		</Flex>
	);
};

export default NavButton;
