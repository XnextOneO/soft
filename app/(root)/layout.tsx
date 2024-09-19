import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "../globals.css";

import { Container, Flex } from "@mantine/core";
import dotenv from 'dotenv';

import Header from "@/components/Header/Header";
import NavMenu from "@/components/NavMenu/NavMenu";

import { Providers } from "../providers";
import classes from "./Root.module.css";


export const metadata = {
	title: "IIS Беларусбанк",
	description: "Международные и межбанковские расчеты",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" data-mantine-color-scheme="light">
			<head>
				<link rel="shortcut icon" href="/favicon.png" />

				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<Providers>
					<Header />
					<Container
						fluid
						className={classes.mainContainer}
						m={0}
						p={0}
						maw="100vw"
					>
						<Flex maw="100%" miw="100%" w="100%" h="100%" direction="row">
							<NavMenu />
							{children}
						</Flex>
					</Container>
				</Providers>
			</body>
		</html>
	);
};
export default RootLayout;
