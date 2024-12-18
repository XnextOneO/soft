import { useEffect, useState } from "react";
import Image from "next/image";
import { Flex, SegmentedControl, UnstyledButton } from "@mantine/core";

import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import BY from "../../public/assets/BY.svg";
import RU from "../../public/assets/RU.svg";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton = (): JSX.Element => {
    const [locale, setLocale] = useState("ru");
    const flagImages = {
        BY: BY,
        RU: RU,
        // Добавьте другие языки и их флаги здесь
    };
    const items = [{ value: "ru" }, { value: "by" }];

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

    return (
        // <UnstyledButton onClick={handleLocaleChange} h={22}>
        //     {locale === "ru" ? (
        //         <Image src={RU} alt="Русский" width={"44"} height={22} />
        //     ) : (
        //         <Image src={BY} alt="Бел" width={"44"} height={22} />
        //     )}
        // </UnstyledButton>
        <SegmentedControl
            value={locale}
            onChange={handleLocaleChange}
            radius="xl"
            size="md"
            data={items.map((item) => ({
                value: item.value,
                label: (
                    <Flex>
                        <Image alt="" src={flagImages[item.value.toUpperCase()]} width="30" height={20} />
                    </Flex>
                ),
            }))}
            classNames={classes}
        />
    );
};
export default LanguageSwitcherButton;
