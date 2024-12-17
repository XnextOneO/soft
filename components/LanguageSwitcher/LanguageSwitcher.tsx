"use client";

import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcherSelect from './LanguageSwitcherSelect';
import { useEffect, useState } from 'react';
import { setUserLocale } from '@/i18n/locale';

const LanguageSwitcher = () => {
  const t = useTranslations('language-switcher');
  const locale = useLocale();
  const [value, setValue] = useState(locale); // Состояние для текущего языка

  const handleChange = (newLocale: string) => {
    setValue(newLocale);
  };

  useEffect(() => {
    console.log(locale)
    setValue(locale);
  }, [locale]);

  return (
    <LanguageSwitcherSelect
      value={value} // Передаем текущее значение
      items={[
        {
          value: 'ru',
          label: t('ru')
        },
        {
          value: 'by',
          label: t('by')
        }
      ]}
      label={t('label')}
      onChange={handleChange} // Передаем функцию изменения
    />
  );
};

export default LanguageSwitcher;
