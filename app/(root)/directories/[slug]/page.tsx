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
	useMantineColorScheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "../Directories.module.css";
import DataTable from "@/components/DataTable/DataTable";
import NavMenu from "@/components/NavMenu/NavMenu";
import { useDisclosure } from "@mantine/hooks";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";
import { useContext, useEffect, useState, useCallback } from "react";
import { getNsiDirectory } from "@/utils/api/books/nsi/nsiDirectories";
import { Context } from "@/app/providers";

const DirectoryPage = ({ params }: { params: { slug: string } }) => {
	const colorScheme = useMantineColorScheme();
	const [opened, { open, close }] = useDisclosure(false);

	const { directoriesStore } = useContext(Context);
	const [tableData, setTableData] = useState();

	const breadcrumbs = [
		{ title: "Главная страница IIS Беларусбанк", href: "/" },
		{ title: "Справочники", href: "/directories" },
		{
			title: `${directoriesStore.nsiDirectories.find((dir) => dir.link === "/" + params.slug)?.name}`,
			href: `${params.slug}`,
		},
	].map((item, index) => (
		<Anchor
			c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
			href={item.href}
			key={index}
			size="sm"
			className={classes.breadcrumbsItem}
		>
			{item.title}
		</Anchor>
	));

	return (
		<>
			<Container
				fluid
				className={classes.tableContainer}
				mah="100vh"
				maw="100vw"
			>
				<Flex maw="100%" w="100%" h="100%" direction="row">
					<NavMenu />
					<Flex
						direction="column"
						p={0}
						gap={0}
						w="100%"
						h="100%"
						style={{ overflow: "hidden" }}
					>
						<Breadcrumbs
							separator=">"
							separatorMargin="5px"
							p="xs"
							style={{ borderBottom: "1px solid #DFDFDF" }}
						>
							{breadcrumbs}
						</Breadcrumbs>

						<DataTable slug={params.slug} onOpen={open} />
					</Flex>
				</Flex>
			</Container>
			<UpdateTableModal opened={opened} close={close} />
		</>
	);
};

export default DirectoryPage;
