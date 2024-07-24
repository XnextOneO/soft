import '@mantine/core/styles.css'; 
import '@mantine/dates/styles.css'; 
import 'mantine-react-table/styles.css';


import { Providers } from "../providers";
import Header from "@/components/Header/Header";
import "../globals.css"

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
					{children}
				</Providers>
			</body>
		</html>
	);
};
export default RootLayout;
