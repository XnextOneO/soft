import Link from "next/link";
import { Text, useMantineColorScheme } from "@mantine/core";

import classes from "./Breadcrumbs.module.css";
const BreadcrumbsItem = ({ children, href }: BreadcrumbItemProps) => {
  const colorScheme = useMantineColorScheme();

  return (
    <Link href={href} style={{ textDecoration: "none" }} passHref>
      <Text
        c={colorScheme.colorScheme === "dark" ? "#8B8B8B" : "#006040"}
        size="sm"
        className={classes.breadcrumbsItem}
      >
        {children}
      </Text>
    </Link>
  );
};

export default BreadcrumbsItem;
