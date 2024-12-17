"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

import { setUserLocale } from "@/i18n/locale";

import LanguageSwitcherSelect from "./LanguageSwitcherSelect";

const LanguageSwitcher = () => {
    const t = useTranslations("language-switcher");
    const locale = useLocale();
    const [value, setValue] = useState(locale); // Состояние для текущего языка

    const handleChange = (newLocale: string) => {
        setValue(newLocale);
        // setUserLocale(value);
    };

    // useEffect(() => {
    //     console.log(locale);
    //     setValue(locale);
    // }, [locale]);

    return (
        <LanguageSwitcherSelect
            value={value} // Передаем текущее значение
            items={[
                {
                    value: "ru",
                    label: t("ru"),
                },
                {
                    value: "by",
                    label: t("by"),
                },
            ]}
            label={t("label")}
            onChange={handleChange} // Передаем функцию изменения
        />
    );
};

export default LanguageSwitcher;
