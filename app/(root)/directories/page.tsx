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
	Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Directories.module.css";
import DataTable from "@/components/Table/DataTable";
import NavMenu from "@/components/NavMenu/NavMenu";


const DirectoriesPage: React.FC = () => {
	const breadcrumbs = [
		{ title: "Главная страница IIS Беларусбанк", href: "/" },
		{ title: "Справочники", href: "#" },
		{ title: "Справочник отчетов", href: "#" },
	].map((item, index) => (
		<Anchor c="#006040" href={item.href} key={index} size="sm">
			{item.title}
		</Anchor>
	));

	return (
		<Container fluid className={classes.tableContainer} mah="100vh">
			<Flex w="100%" h="100%" direction="row">
				<NavMenu />
				<Stack px="sm" w="100%" gap={0} h="100%" mah="100%">
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
						<Group w="100%">
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
					<DataTable height="85%" />
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
};

export default DirectoriesPage;
