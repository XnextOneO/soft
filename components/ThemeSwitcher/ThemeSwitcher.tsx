'use client';

import { ActionIcon, useComputedColorScheme,useMantineColorScheme } from '@mantine/core';
import { IconMoon,IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import classes from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      style={{position: "absolute", top: "94.9vh", left: "4.5px", zIndex: 1000}}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      radius="xl"
      aria-label="Toggle color scheme"
          >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};
export default ThemeSwitcher;