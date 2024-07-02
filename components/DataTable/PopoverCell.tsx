import React from "react";
import { Table, Popover, Text } from "@mantine/core";

interface ICellProps {
	w: number | string;
	miw: number | string;
	maw: number | string;
	children?: number | string;
}

const PopoverCell: React.FC<ICellProps> = ({ w, miw, maw, children }) => {
	return (
		<Popover width="20%" position="bottom" withArrow shadow="md">
			<Popover.Target>
				<Table.Td w={w} miw={miw} maw={maw}>
					<Text truncate="end" size="sm">
						{children}
					</Text>
				</Table.Td>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size="xs">{children}</Text>
			</Popover.Dropdown>
		</Popover>
	);
};

export default PopoverCell;
