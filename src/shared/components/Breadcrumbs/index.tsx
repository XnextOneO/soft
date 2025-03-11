import { useTranslation } from "react-i18next";
import {
  Anchor,
  Breadcrumbs,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";

import classes from "./Breadcrumbs.module.scss";

const MyBreadcrumbs = (): JSX.Element => {
  const pathname = location.pathname;
  const colorScheme = useMantineColorScheme();
  const pathSegments = pathname.split("/").filter(Boolean);
  const { t } = useTranslation(["bread-crumbs"]);
  const filteredSegments = pathSegments.filter(
    (segment) => segment !== "nsi" && segment !== "scbank",
  );

  const items = filteredSegments.map((segment, index) => {
    const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
    const title = t(segment) || segment.replaceAll("-", " ");

    return { title, href };
  });

  return (
    <Breadcrumbs
      className={classes.wrapper}
      separator=">"
      separatorMargin="5px"
      style={{
        borderBottom: `1px solid ${colorScheme.colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
      }}
    >
      <Link to={"/"} color="">
        <Anchor
          size="sm"
          c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
          className={classes.breadCrumbLink}
        >
          {t("main-page")}
        </Anchor>
      </Link>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <span key={index}>
            <Text size="sm">
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </Text>
          </span>
        ) : (
          <Link key={index} to={item.href}>
            <Anchor
              size="sm"
              className={classes.breadCrumbLink}
              c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
            >
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </Anchor>
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
