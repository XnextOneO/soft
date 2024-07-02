import { useEffect, useRef, useState } from "react";
import {
	Table,
	ScrollArea,
	useMantineColorScheme,
	Checkbox,
	Container,
} from "@mantine/core";
import PopoverCell from "./PopoverCell";

const elements = [
	{
		id: 1,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
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
		id: 11,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 12,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 13,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 14,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 15,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 16,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 17,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 18,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 19,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 20,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 21,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 22,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 23,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
	{
		id: 24,
		bankNumber: 510,
		reportName:
			"Информация о Субъектах МСП, профинансированных по продукту «Стабилизационный»",
		date: "Carbon",
	},
];

const DataTable = () => {
	const colorScheme = useMantineColorScheme();
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const [scrollPositionTable, onScrollPositionTableChange] = useState({
		x: 0,
		y: 0,
	});
	const viewport = useRef<HTMLDivElement>(null);

	useEffect(() => {
		viewport.current!.scrollTo({
			top: 0,
			left: scrollPositionTable.x,
			behavior: "instant"
		});
		// viewport.current!.getBoundingClientRect().x = scrollPositionTable.x;
		// viewport.current!.getBoundingClientRect().y = 0;
		// console.log(viewport.current!.getBoundingClientRect().x);
	}, [scrollPositionTable]);

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
			<Table.Td w={36} miw={36} maw={150}>
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
			<PopoverCell w={150} miw={150} maw={150}>
				{element.id}
			</PopoverCell>
			<PopoverCell w={280} miw={280} maw={280}>
				{element.date}
			</PopoverCell>
			<PopoverCell w={760} miw={760} maw={760}>
				{element.reportName}
			</PopoverCell>
			<PopoverCell w={310} miw={310} maw={310}>
				{element.bankNumber}
			</PopoverCell>
			<PopoverCell w={150} miw={150} maw={150}></PopoverCell>
		</Table.Tr>
	));

	return (
		<>
			<ScrollArea
				type="never"
				w="100%"
				h="45px"
				m={0}
				p={0}
				viewportRef={viewport}
			>
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
				</Table>
			</ScrollArea>
			<ScrollArea
				onScrollPositionChange={onScrollPositionTableChange}
				miw={600}
				w="100%"
				className="data-wrapper"
			>
				<Table striped highlightOnHover withColumnBorders>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
};

export default DataTable;
