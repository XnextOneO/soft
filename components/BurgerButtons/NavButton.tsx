import { Flex } from "@mantine/core";
import React from "react";

interface NavButtonProps {
	className?: string;
	children: React.ReactNode;
}

const NavButton = ({ children, className, ...rest }: NavButtonProps) => {
	return (
		<Flex
			p="sm"
			justify="flex-start"
			align="center"
			className={className}
			{...rest}
		>
			{children}
		</Flex>
	);
};

export default NavButton;
