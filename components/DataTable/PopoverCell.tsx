import React from "react";
import { Table, Popover, Text } from "@mantine/core";

interface ICellProps {
	children?: number | string;
}

const PopoverCell: React.FC<ICellProps> = ({ children }) => {
	return (
		<Popover width="20%" position="bottom" withArrow shadow="md">
			<Popover.Target>
				<Text truncate="end" size="sm">
					{children}
				</Text>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size="xs">{children}</Text>
			</Popover.Dropdown>
		</Popover>
	);
};

export default PopoverCell;
