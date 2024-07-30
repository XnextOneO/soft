import React, { useEffect, useState } from "react";

interface IconProps {
	active?: boolean;
	colorScheme: string;
	path: string;
}

const CustomIcon = ({ active, colorScheme, path }: IconProps) => {
	const [iconColorState, setIconColorState] = useState<string>("");

	useEffect(() => {
		setIconColorState(
			active ? "white" : colorScheme === "dark" ? "white" : "#333333"
		);
	}, [active, colorScheme]);

	return (
		<svg
			width="60"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={path} fill={iconColorState} />
		</svg>
	);
};

export default CustomIcon;
