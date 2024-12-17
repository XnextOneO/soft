'use client';

import { Locale } from '../../i18n/config';
import { setUserLocale } from '../../i18n/locale';
import { SegmentedControl } from '@mantine/core';
import classes from "./LanguageSwitcher.module.scss";
import { useEffect, useState } from 'react';

type Props = {
  value: string; // Изменено на value
  items: Array<{ value: string; label: string }>;
  label: string;
  onChange: (value: string) => void; // Добавлено onChange
};

export default function LanguageSwitcherSelect({
  value, // Используем value вместо defaultValue
  items,
  label,
  onChange // Получаем onChange
}: Props) {
  useEffect(() => {
    // Устанавливаем значение при первом рендере
    onChange(value);
  }, [value, onChange]);

  return (
    <SegmentedControl
      value={value}
      onChange={onChange}
      radius="xl"
      size="md"
      data={items.map((item) => ({
        value: item.value,
        label: item.label
      }))}
      classNames={classes}
    />
  );
}
