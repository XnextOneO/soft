// components/LanguageSwitcherButton.tsx
"use client";

import { useEffect, useState } from "react";

import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

const LanguageSwitcherButton = (): JSX.Element => {
    const [locale, setLocale] = useState("by");

    useEffect(() => {
        const fetchLocale = async (): Promise<void> => {
            const currentLocale = await getUserLocale();
            setLocale(currentLocale);
        };
        fetchLocale();
    }, []);

    const handleLocaleChange = async (): Promise<void> => {
        const newLocale = locale === "ru" ? "by" : "ru";
        await setUserLocale(newLocale);
        setLocale(newLocale);
    };

    return <button onClick={handleLocaleChange}>{locale === "ru" ? "RU" : "BY"}</button>;
};

export default LanguageSwitcherButton;
