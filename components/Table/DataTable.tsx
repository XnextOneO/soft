import { useRef, useState } from "react";
import {
	Table,
	ScrollArea,
	Button,
	Stack,
	Group,
	useMantineColorScheme,
	Checkbox,
} from "@mantine/core";

const elements = [
	{
		id: 1,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 2,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 3,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 4,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 5,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 6,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 7,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 8,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 9,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 10,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
];

const DataTable = ({ height }: { height: string }) => {
	const colorScheme = useMantineColorScheme();

	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const rows = elements.map((element) => (
		<Table.Tr
			key={element.id}
			bg={
				selectedRows.includes(element.id)
					? colorScheme.colorScheme === "dark"
						? "#3F6846"
						: "#D3F9D9"
					: undefined
			}
		>
			<Table.Td w={36} miw={36}>
				<Checkbox
					size="xs"
					color="#007458"
					aria-label="Select row"
					checked={selectedRows.includes(element.id)}
					onChange={(event) =>
						setSelectedRows(
							event.currentTarget.checked
								? [...selectedRows, element.id]
								: selectedRows.filter((id) => id !== element.id)
						)
					}
				/>
			</Table.Td>
			<Table.Td w={150} miw={150}>
				{element.id}
			</Table.Td>
			<Table.Td w={280} miw={280}>
				{element.date}
			</Table.Td>
			<Table.Td w={760} miw={760}>
				{element.reportName}
			</Table.Td>
			<Table.Td w={310} miw={310}>
				{element.bankNumber}
			</Table.Td>
			<Table.Td w={150} miw={150}></Table.Td>
		</Table.Tr>
	));

	return (
		<Stack align="center" h={height} gap={0}>
			<Table.ScrollContainer minWidth="1000px" w="100%">
				<ScrollArea maw="100%">
					<Table
						striped
						highlightOnHover
						withTableBorder
						withColumnBorders
					>
						<Table.Thead pos="sticky" top={0}>
							<Table.Tr>
								<Table.Th w={36} miw={36}>
									<Checkbox
										size="xs"
										color="#007458"
										aria-label="Select row"
									/>
								</Table.Th>
								<Table.Th w={150} miw={150}>
									№
								</Table.Th>
								<Table.Th w={280} miw={280}>
									Номер учреждения банка
								</Table.Th>
								<Table.Th w={760} miw={760}>
									Наименование отчета
								</Table.Th>
								<Table.Th w={310} miw={310}>
									Дата
								</Table.Th>
								<Table.Th w={150} miw={150}></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</ScrollArea>
			</Table.ScrollContainer>
		</Stack>
	);
};

export default DataTable;
