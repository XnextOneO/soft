import { useEffect, useState } from "react";
import Image from "next/image";
import { UnstyledButton } from "@mantine/core";

import { MainLoader } from "@/components/MainLoader/MainLoader";
import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import BY from "../../public/assets/BY.svg";
import RU from "../../public/assets/RU.svg";

import classes from "./LanguageSwitcher.module.scss";

const LanguageSwitcherButton = (): JSX.Element => {
    const [locale, setLocale] = useState("ru");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocale = async (): Promise<void> => {
            const currentLocale = await getUserLocale();
            setLocale(currentLocale);
        };
        fetchLocale();
    }, []);

    const handleLocaleChange = async (): Promise<void> => {
        setLoading(true);
        const newLocale = locale === "ru" ? "by" : "ru";
        await setUserLocale(newLocale);
        setLocale(newLocale);
        setLoading(false);
    };

    return (
        <UnstyledButton onClick={handleLocaleChange} h={22} className={classes.btn}>
            {loading ? (
                <MainLoader />
            ) : // eslint-disable-next-line sonarjs/no-nested-conditional
            locale === "ru" ? (
                <Image src={RU} alt="Русский" width={"44"} height={22} />
            ) : (
                <Image src={BY} alt="Бел" width={"44"} height={22} />
            )}
        </UnstyledButton>
    );
};

export default LanguageSwitcherButton;
