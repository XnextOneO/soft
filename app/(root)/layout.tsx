import { FC, PropsWithChildren } from "react";
import { Container, Flex } from "@mantine/core";

import MyBreadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header/Header";
import NavMenu from "@/components/NavMenu/NavMenu";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "../globals.scss";

import { Providers } from "../providers";

import classes from "./Root.module.scss";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
    title: "IIS Беларусбанк",
    description: "Международные и межбанковские расчеты",
};

const RootLayout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    return (
        <html lang="en" data-mantine-color-scheme="light">
            <head>
                <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <title>{metadata.title}</title>
            </head>
            <body>
                <Providers>
                    <Header isBurger={true} isProfile={true} link={true} />
                    <Container fluid className={classes.mainContainer} m={0} p={0} maw="100vw">
                        <Flex maw="100%" miw="100%" w="100%" h="100%" direction="row">
                            <NavMenu />
                            <div className={classes.contentWrapper}>
                                <MyBreadcrumbs />
                                {children}
                            </div>
                        </Flex>
                    </Container>
                </Providers>
            </body>
        </html>
    );
};
export default RootLayout;
