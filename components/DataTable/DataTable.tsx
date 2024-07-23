import { useState } from "react";
import {
	Table,
	ScrollArea,
	useMantineColorScheme,
	Checkbox,
	Text,
} from "@mantine/core";
import PopoverCell from "./PopoverCell";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataGridPremium } from "@mui/x-data-grid-premium";

const DataTable = ({ data }: { data: any }) => {
	const colorScheme = useMantineColorScheme();
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	if (!data) {
		return;
	}

	// const rows = data.map((element: any) => (
	// 	<Table.Tr
	// 		key={element.id}
	// 		bg={
	// 			selectedRows.includes(element.id)
	// 				? colorScheme.colorScheme === "dark"
	// 					? "#3F6846"
	// 					: "#D3F9D9"
	// 				: undefined
	// 		}
	// 	>
	// 		<Table.Td w={36} miw={36} maw={150}>
	// 			<Checkbox
	// 				size="xs"
	// 				color="#007458"
	// 				aria-label="Select row"
	// 				checked={selectedRows.includes(element.id)}
	// 				onChange={(event) =>
	// 					setSelectedRows(
	// 						event.currentTarget.checked
	// 							? [...selectedRows, element.id]
	// 							: selectedRows.filter((id) => id !== element.id)
	// 					)
	// 				}
	// 			/>
	// 		</Table.Td>

	// 		{Object.keys(element).map((key) => (
	// 			<PopoverCell key={key} maw={800}>
	// 				{element[key]}
	// 			</PopoverCell>
	// 		))}
	// 	</Table.Tr>
	// ));

	const columnsMap = new Map();

	data.forEach((element: {}) => {
		Object.keys(element).forEach((key) => {
			columnsMap.set(key, true);
		});
	});

	const rows = data.map((item: Object, index: number) => ({
		id: index,
		...item
	}));

	// const columns = Array.from(columnsMap.keys()).map((key) => (
	// 	<Table.Th key={key} miw={150} maw={700}>
	// 		<Text fw={600} size="sm">
	// 			{key}
	// 		</Text>
	// 	</Table.Th>
	// ));

	// const columns: GridColDef[] = [
	// 	{ field: 'id', headerName: 'ID', width: 70 },
	// 	{ field: 'firstName', headerName: 'First name', width: 130 },
	// 	{ field: 'lastName', headerName: 'Last name', width: 130 },
	// 	{
	// 	  field: 'age',
	// 	  headerName: 'Age',
	// 	  type: 'number',
	// 	  width: 90,
	// 	},
	// 	{
	// 	  field: 'fullName',
	// 	  headerName: 'Full name',
	// 	  description: 'This column has a value getter and is not sortable.',
	// 	  sortable: false,
	// 	  width: 160,
	// 	  valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
	// 	},
	//   ];

	const columns: GridColDef[] = Array.from(columnsMap.keys()).map((key) => {
		return {
			field: key,
			headerName: key,
			minWidth: 150,
			maxWidth: 700
		};
	});

	console.log(columns);
	console.log(data);

	return (
		<>
			{/* <ScrollArea w="100%" m={0} p={0}>
				<Table
					style={{
						borderTop: "1px solid #DFDFDF",
						borderBottom: "1px solid #DFDFDF",
					}}
					striped
					highlightOnHover
					withColumnBorders
					miw="800px"
					maw="100%"
				>
					<Table.Thead top={0}>
						<Table.Tr>
							<Table.Th w={36} miw={36}>
								<Checkbox
									size="xs"
									color="#007458"
									aria-label="Select row"
								/>
							</Table.Th>
							{columns}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea> */}
			<DataGridPremium
				rows={rows}
				columns={columns}
				// initialState={{
				// 	pagination: {
				// 		paginationModel: { page: 0, pageSize: 20 },
				// 	},
				// }}
				// pageSizeOptions={[5, 10]}
				checkboxSelection
			/>
		</>
	);
};

export default DataTable;
