import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import { useRouter } from 'next/router';

interface Crumb {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  const location = useRouter().query;
  const [currentCrumb, setCurrentCrumb] = useState<Crumb | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const crumb = crumbs.find((crumb) => crumb.href === currentPath);
    setCurrentCrumb(crumb);
  }, [location.pathname, crumbs]);

  return (
    <MantineBreadcrumbs separator=">" separatorMargin="5px" p="xs">
      {crumbs.map((crumb, index) => (
        <Link key={index} href={crumb.href} style={{ textDecoration: 'none' }}>
          <Text c="#8B8B8B" size="sm">
            {crumb.title}
          </Text>
        </Link>
      ))}
    </MantineBreadcrumbs>
  );
};

export default Breadcrumbs;