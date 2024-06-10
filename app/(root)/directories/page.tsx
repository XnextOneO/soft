"use client";

import {
	Table,
	Checkbox,
	Anchor,
	Breadcrumbs,
	Text,
	Pagination,
	Group,
	Container,
	TextInput,
	Flex,
	Stack,
	ActionIcon,
	Burger,
	UnstyledButton,
	Button,
	useMantineColorScheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../providers";
import classes from "./Directories.module.css";
import { observer } from "mobx-react-lite";

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
];

const DirectoriesPage: React.FC = observer(() => {
	const { burgerStore } = useContext(Context);
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
			<Table.Td>
				<Checkbox
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
			<Table.Td>{element.id}</Table.Td>
			<Table.Td>{element.date}</Table.Td>
			<Table.Td>{element.reportName}</Table.Td>
			<Table.Td>{element.bankNumber}</Table.Td>
			<Table.Td></Table.Td>
		</Table.Tr>
	));

	const breadcrumbs = [
		{ title: "Главная страница IIS Беларусбанк", href: "/" },
		{ title: "Справочники", href: "#" },
		{ title: "Справочник отчетов", href: "#" },
	].map((item, index) => (
		<Anchor c="#006040" href={item.href} key={index}>
			{item.title}
		</Anchor>
	));

	return (
		<Container className={classes.tableContainer} fluid>
			<Flex w="100%" h="100%" direction="row">
				{burgerStore.opened ? (
					<Stack
						w={200}
						gap={0}
						style={{ borderRight: "1px solid #DFDFDF" }}
					>
						<Flex
							p="sm"
							justify="flex-start"
							align="center"
							className={classes.navIcon}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.4444 5.22223H8.9L7.61667 3.45556C7.51323 3.31401 7.37776 3.19894 7.22134 3.11976C7.06492 3.04059 6.89198 2.99955 6.71667 3H3.11111C2.81643 3 2.53381 3.11707 2.32544 3.32544C2.11706 3.53381 2 3.81643 2 4.11111V16.3333C2 16.628 2.11706 16.9106 2.32544 17.119C2.53381 17.3274 2.81643 17.4444 3.11111 17.4444H16.4444C16.7391 17.4444 17.0217 17.3274 17.2301 17.119C17.4385 16.9106 17.5556 16.628 17.5556 16.3333V6.33334C17.5556 6.03865 17.4385 5.75604 17.2301 5.54766C17.0217 5.33929 16.7391 5.22223 16.4444 5.22223ZM3.11111 6.33334V4.11111H6.71667L8.22778 6.33334H3.11111Z"
									fill={
										colorScheme.colorScheme === "dark"
											? "white"
											: "#333333"
									}
								/>
							</svg>
							<Text ml={10}>Справочники</Text>
						</Flex>

						<Flex
							p="sm"
							justify="flex-start"
							align="center"
							className={classes.navIcon}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 19.1667L7.5 16.6667H4.16667C3.70833 16.6667 3.31611 16.5036 2.99 16.1775C2.66389 15.8514 2.50056 15.4589 2.5 15V3.33335C2.5 2.87502 2.66333 2.4828 2.99 2.15669C3.31667 1.83058 3.70889 1.66724 4.16667 1.66669H15.8333C16.2917 1.66669 16.6842 1.83002 17.0108 2.15669C17.3375 2.48335 17.5006 2.87558 17.5 3.33335V15C17.5 15.4584 17.3369 15.8509 17.0108 16.1775C16.6847 16.5042 16.2922 16.6672 15.8333 16.6667H12.5L10 19.1667ZM9.91667 14.1667C10.2083 14.1667 10.455 14.0659 10.6567 13.8642C10.8583 13.6625 10.9589 13.4161 10.9583 13.125C10.9578 12.8339 10.8569 12.5872 10.6558 12.385C10.4547 12.1828 10.2083 12.0822 9.91667 12.0834C9.625 12.0845 9.37833 12.1853 9.17667 12.3859C8.975 12.5864 8.87444 12.8328 8.875 13.125C8.87556 13.4172 8.97639 13.6639 9.1775 13.865C9.37861 14.0661 9.625 14.1667 9.91667 14.1667ZM9.16667 10.9584H10.7083C10.7083 10.7222 10.7189 10.5209 10.74 10.3542C10.7611 10.1875 10.8061 10.0278 10.875 9.87502C10.9439 9.72224 11.0306 9.58002 11.135 9.44835C11.2394 9.31669 11.3889 9.15335 11.5833 8.95835C12.0694 8.47224 12.4133 8.06585 12.615 7.73919C12.8167 7.41252 12.9172 7.04113 12.9167 6.62502C12.9167 5.88891 12.6667 5.2953 12.1667 4.84419C11.6667 4.39308 10.9931 4.16724 10.1458 4.16669C9.38195 4.16669 8.73278 4.35419 8.19833 4.72919C7.66389 5.10419 7.29222 5.62502 7.08333 6.29169L8.45833 6.83335C8.55556 6.45835 8.75 6.15641 9.04167 5.92752C9.33333 5.69863 9.67361 5.58391 10.0625 5.58335C10.4375 5.58335 10.75 5.68419 11 5.88585C11.25 6.08752 11.375 6.35474 11.375 6.68752C11.375 6.92363 11.2986 7.17363 11.1458 7.43752C10.9931 7.70141 10.7361 7.99308 10.375 8.31252C10.1389 8.50697 9.94778 8.69808 9.80167 8.88585C9.65556 9.07363 9.53417 9.27141 9.4375 9.47919C9.34083 9.68696 9.27139 9.90585 9.22917 10.1359C9.18694 10.3659 9.16611 10.64 9.16667 10.9584Z"
									fill={
										colorScheme.colorScheme === "dark"
											? "white"
											: "#333333"
									}
								/>
							</svg>
							<Text ml={10}>Помощь</Text>
						</Flex>
					</Stack>
				) : (
					<Stack gap={0} style={{ borderRight: "1px solid #DFDFDF" }}>
						<Flex
							p="sm"
							justify="center"
							align="center"
							w={60}
							className={classes.navIcon}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.4444 5.22223H8.9L7.61667 3.45556C7.51323 3.31401 7.37776 3.19894 7.22134 3.11976C7.06492 3.04059 6.89198 2.99955 6.71667 3H3.11111C2.81643 3 2.53381 3.11707 2.32544 3.32544C2.11706 3.53381 2 3.81643 2 4.11111V16.3333C2 16.628 2.11706 16.9106 2.32544 17.119C2.53381 17.3274 2.81643 17.4444 3.11111 17.4444H16.4444C16.7391 17.4444 17.0217 17.3274 17.2301 17.119C17.4385 16.9106 17.5556 16.628 17.5556 16.3333V6.33334C17.5556 6.03865 17.4385 5.75604 17.2301 5.54766C17.0217 5.33929 16.7391 5.22223 16.4444 5.22223ZM3.11111 6.33334V4.11111H6.71667L8.22778 6.33334H3.11111Z"
									fill={
										colorScheme.colorScheme === "dark"
											? "white"
											: "#333333"
									}
								/>
							</svg>
						</Flex>

						<Flex
							p="sm"
							justify="center"
							align="center"
							className={classes.navIcon}
						>
							<svg
								width="30"
								height="30"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 19.1667L7.5 16.6667H4.16667C3.70833 16.6667 3.31611 16.5036 2.99 16.1775C2.66389 15.8514 2.50056 15.4589 2.5 15V3.33335C2.5 2.87502 2.66333 2.4828 2.99 2.15669C3.31667 1.83058 3.70889 1.66724 4.16667 1.66669H15.8333C16.2917 1.66669 16.6842 1.83002 17.0108 2.15669C17.3375 2.48335 17.5006 2.87558 17.5 3.33335V15C17.5 15.4584 17.3369 15.8509 17.0108 16.1775C16.6847 16.5042 16.2922 16.6672 15.8333 16.6667H12.5L10 19.1667ZM9.91667 14.1667C10.2083 14.1667 10.455 14.0659 10.6567 13.8642C10.8583 13.6625 10.9589 13.4161 10.9583 13.125C10.9578 12.8339 10.8569 12.5872 10.6558 12.385C10.4547 12.1828 10.2083 12.0822 9.91667 12.0834C9.625 12.0845 9.37833 12.1853 9.17667 12.3859C8.975 12.5864 8.87444 12.8328 8.875 13.125C8.87556 13.4172 8.97639 13.6639 9.1775 13.865C9.37861 14.0661 9.625 14.1667 9.91667 14.1667ZM9.16667 10.9584H10.7083C10.7083 10.7222 10.7189 10.5209 10.74 10.3542C10.7611 10.1875 10.8061 10.0278 10.875 9.87502C10.9439 9.72224 11.0306 9.58002 11.135 9.44835C11.2394 9.31669 11.3889 9.15335 11.5833 8.95835C12.0694 8.47224 12.4133 8.06585 12.615 7.73919C12.8167 7.41252 12.9172 7.04113 12.9167 6.62502C12.9167 5.88891 12.6667 5.2953 12.1667 4.84419C11.6667 4.39308 10.9931 4.16724 10.1458 4.16669C9.38195 4.16669 8.73278 4.35419 8.19833 4.72919C7.66389 5.10419 7.29222 5.62502 7.08333 6.29169L8.45833 6.83335C8.55556 6.45835 8.75 6.15641 9.04167 5.92752C9.33333 5.69863 9.67361 5.58391 10.0625 5.58335C10.4375 5.58335 10.75 5.68419 11 5.88585C11.25 6.08752 11.375 6.35474 11.375 6.68752C11.375 6.92363 11.2986 7.17363 11.1458 7.43752C10.9931 7.70141 10.7361 7.99308 10.375 8.31252C10.1389 8.50697 9.94778 8.69808 9.80167 8.88585C9.65556 9.07363 9.53417 9.27141 9.4375 9.47919C9.34083 9.68696 9.27139 9.90585 9.22917 10.1359C9.18694 10.3659 9.16611 10.64 9.16667 10.9584Z"
									fill={
										colorScheme.colorScheme === "dark"
											? "white"
											: "#333333"
									}
								/>
							</svg>
						</Flex>
					</Stack>
				)}
				<Stack px="sm" w="100%" gap={0}>
					<Breadcrumbs
						separator=">"
						separatorMargin="5px"
						py="xs"
						style={{ borderBottom: "1px solid #DFDFDF" }}
					>
						{breadcrumbs}
					</Breadcrumbs>

					<Group justify="space-between" py="xs">
						<TextInput
							w={300}
							miw={150}
							rightSectionPointerEvents="none"
							rightSection={<IconSearch />}
							placeholder="Поиск по таблице"
						/>
						<Group>
							<Button
								size="sm"
								px="xs"
								radius="xs"
								color="#007458"
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M24.0734 13.8074V9.08044C24.0734 8.67834 23.5909 8.48175 23.3139 8.76769L21.7233 10.3582C20.8863 9.52117 19.8749 8.87897 18.7613 8.47739C17.6478 8.07582 16.4593 7.92476 15.2807 8.03497C11.5366 8.37452 8.4538 11.3859 8.04276 15.1299C7.82548 17.2292 8.44217 19.3298 9.75979 20.9786C11.0774 22.6273 12.9903 23.692 15.0859 23.9429C17.1815 24.1939 19.2917 23.611 20.9614 22.32C22.631 21.029 23.7263 19.1334 24.0108 17.0422C24.0734 16.506 23.6534 16.0414 23.1173 16.0414C22.6705 16.0414 22.2952 16.372 22.2416 16.8098C21.8573 19.9284 19.1677 22.341 15.9419 22.2963C12.6268 22.2517 9.8299 19.4548 9.77628 16.1307C9.72267 12.6458 12.5553 9.78636 16.0313 9.78636C17.7559 9.78636 19.3196 10.4923 20.4544 11.6182L18.5869 13.4857C18.3009 13.7717 18.4975 14.2542 18.8996 14.2542H23.6266C23.8768 14.2542 24.0734 14.0576 24.0734 13.8074Z"
										fill="white"
									></path>
								</svg>
							</Button>
							<Button color="#007458" size="sm" radius="xs">
								Обновить таблицу
							</Button>
						</Group>
					</Group>
					{/* </Container> */}
					<Table.ScrollContainer minWidth="900px">
						<Table
							stickyHeader
							striped
							highlightOnHover
							withTableBorder
							withColumnBorders
						>
							<Table.Thead>
								<Table.Tr>
									<Table.Th></Table.Th>
									<Table.Th>№</Table.Th>
									<Table.Th>Номер учреждения банка</Table.Th>
									<Table.Th>Наименование отчета</Table.Th>
									<Table.Th>Дата</Table.Th>
									<Table.Th></Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</Table.ScrollContainer>
					<Container fluid px={0} w="100%">
						<Group justify="space-between" w="100%">
							<Text>Отображены записи 1000-1099 из 4567</Text>
							<Pagination
								color="#007458"
								total={20}
								siblings={1}
								defaultValue={10}
							/>
						</Group>
					</Container>
				</Stack>
			</Flex>
		</Container>
	);
});

export default DirectoriesPage;
