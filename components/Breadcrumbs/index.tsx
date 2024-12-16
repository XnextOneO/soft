"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Anchor, Breadcrumbs, useMantineColorScheme } from "@mantine/core";

import classes from "./Breadcrumbs.module.scss";

const MyBreadcrumbs = (): JSX.Element => {
    const pathname = usePathname();
    const colorScheme = useMantineColorScheme();
    const pathSegments = pathname.split("/").filter(Boolean);
    const t = useTranslations("bread-crumbs");
    const filteredSegments = pathSegments.filter((segment) => segment !== "nsi" && segment !== "scbank");

    const items = filteredSegments.map((segment, index) => {
        const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
        const title = t(segment) || segment.replaceAll("-", " ");

        return { title, href };
    });

    return (
        <Breadcrumbs className={classes.wrapper}
            separator=">"
            separatorMargin="5px"
            p="xs"
            style={{
                borderBottom: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
            }}
        >
            <Link href="/" passHref color="">
                <Anchor c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"} className={classes.breadCrumbLink}>{t("main-page")}</Anchor>
            </Link>
            {items.map((item, index) =>
                index === items.length - 1 ? (
                    <span key={index}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</span>
                ) : (
                    <Link key={index} href={item.href} passHref>
                        <Anchor className={classes.breadCrumbLink} c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}>
                            {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                        </Anchor>
                    </Link>
                ),
            )}
        </Breadcrumbs>
    );
};

export default MyBreadcrumbs;
