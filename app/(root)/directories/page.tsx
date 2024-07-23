"use client";

import { Container, Text } from "@mantine/core";
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
				{directoriesStore.nsiDirectories.map((dir, index) => (
					<Text key={index}>
						<Link style={{textDecoration: "none"}} href={"/directories/" + dir.link}>
							{dir.name}
						</Link>
					</Text>
				))}
			</Container>
		</>
	);
});

export default DirectoriesPage;
