import "@mantine/core/styles.css";
import "../globals.scss";

import { Providers } from "../providers";

export const metadata = {
    title: "Ошибка 404 | IIS Беларусбанк",
    description: "Международные и межбанковские расчеты",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
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
