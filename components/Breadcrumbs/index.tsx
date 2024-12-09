"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, Breadcrumbs } from "@mantine/core";

import classes from "./Breadcrumbs.module.scss";

const MyBreadcrumbs = (): JSX.Element => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const filteredSegments = pathSegments.filter((segment) => segment !== "nsi" && segment !== "scbank");

    const items = filteredSegments.map((segment, index) => {
        const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
        const title = segment.replaceAll("-", " ");

        return { title, href };
    });

    return (
        <Breadcrumbs className={classes.wrapper}>
            <Link href="/" passHref>
                <Anchor>Главная</Anchor>
            </Link>
            {items.map((item, index) => (
                <Link key={index} href={item.href} passHref>
                    <Anchor>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Anchor>
                </Link>
            ))}
        </Breadcrumbs>
    );
};

export default MyBreadcrumbs;
