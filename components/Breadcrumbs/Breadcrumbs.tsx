import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumbs as MantineBreadcrumbs, Text } from "@mantine/core";

interface Crumb {
  title: string;
  href: string;
}

interface BreadcrumbsProperties {
  crumbs: Crumb[];
}

const Breadcrumbs: FC<BreadcrumbsProperties> = ({ crumbs }) => {
  const location = useRouter().query;
  const [currentCrumb, setCurrentCrumb] = useState<Crumb | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const crumb = crumbs.find((crumb) => crumb.href === currentPath);
    // @ts-ignore
    setCurrentCrumb(crumb);
  }, [location.pathname, crumbs]);

  return (
    <MantineBreadcrumbs separator=">" separatorMargin="5px" p="xs">
      {crumbs.map((crumb, index) => (
        <Link key={index} href={crumb.href} style={{ textDecoration: "none" }}>
          <Text c="#8B8B8B" size="sm">
            {crumb.title}
          </Text>
        </Link>
      ))}
    </MantineBreadcrumbs>
  );
};

export default Breadcrumbs;
