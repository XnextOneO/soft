"use client";

import { Card, Container, Stack, Text } from "@mantine/core";
import classes from "./Directories.module.css";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/providers";
import Link from "next/link";

const DirectoriesPage = observer(() => {
	const { directoriesStore } = useContext(Context);

	return (
		<>
			<Container
				fluid
				className={classes.tableContainer}
				mah="100vh"
				maw="100vw"
			>
				<Stack
					my={20}
					gap="sm"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{directoriesStore.nsiDirectories.map((dir, index) => (
						<Link
							key={index}
							style={{
								width: '50%',
								textDecoration: "none",
								color: "black",
							}}
							href={"/directories/" + dir.link}
						>
							<Card withBorder>
								{dir.name}
							</Card>
						</Link>
					))}
				</Stack>
			</Container>
		</>
	);
});

export default DirectoriesPage;
