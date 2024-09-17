import "@mantine/core/styles.css";
import "../globals.css"

import { Providers } from "../providers";

export const metadata = {
	title: "IIS Беларусбанк",
	description: "Международные и межбанковские расчеты",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
