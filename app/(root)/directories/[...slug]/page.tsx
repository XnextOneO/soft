"use client";

import { Breadcrumbs, Text, Flex, useMantineColorScheme } from "@mantine/core";
import classes from "../Directories.module.css";
import DataTable from "@/components/DataTable/DataTable";
import NavMenu from "@/components/NavMenu/NavMenu";
import { useDisclosure } from "@mantine/hooks";
import UpdateTableModal from "@/components/UpdateTableModal/UpdateTableModal";
import { useContext } from "react";
import { Context } from "@/app/providers";
import { observer } from "mobx-react-lite";
import Link from "next/link";

const DirectoryPage = observer(
	({ params }: { params: { slug: Array<string> } }) => {
		const colorScheme = useMantineColorScheme();
		const [opened, { open, close }] = useDisclosure(false);

		const { directoriesStore } = useContext(Context);

		const breadcrumbs = [
			{ title: "Главная страница IIS Беларусбанк", href: "/" },
			{ title: "Справочники", href: "/directories" },
			{
				title: `${
					directoriesStore.nsiDirectories
						.concat(
							directoriesStore.rfDirectory,
							directoriesStore.swiftDirectory
						)
						.find((dir) => {
							return dir.link === params.slug.join("/");
						})?.name
				}`,
				href: `${params.slug.join("/")}`,
			},
		].map((item, index) => (
			<Link
				key={index}
				href={item.href}
				style={{ textDecoration: "none" }}
			>
				<Text
					c={
						colorScheme.colorScheme === "dark"
							? "#8B8B8B"
							: "#006040"
					}
					size="sm"
					className={classes.breadcrumbsItem}
				>
					{item.title}
				</Text>
			</Link>
		));

		return (
			<>
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

					<DataTable slug={params.slug.join("/")} onOpen={open} />
				</Flex>
				<UpdateTableModal
					link={params.slug.join("/")}
					opened={opened}
					close={close}
				/>
			</>
		);
	}
);

export default DirectoryPage;
