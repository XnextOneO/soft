import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Flex, SegmentedControl, useMantineColorScheme } from "@mantine/core";

import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import BYBlack from "../../public/assets/BY_black.svg";
import BYWhite from "../../public/assets/BY_white.svg";
import RUBlack from "../../public/assets/RU_black.svg";
import RUWhite from "../../public/assets/RU_white.svg";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton = (): JSX.Element => {
    const colorScheme = useMantineColorScheme();
    const [locale, setLocale] = useState("ru");
    const flagImages: Record<string, StaticImageData> = {
        BYBlack: BYBlack,
        BYWhite: BYWhite,
        RUBlack: RUBlack,
        RUWhite: RUWhite,
        // Add other languages and their flags here
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
        <SegmentedControl
            value={locale}
            onChange={handleLocaleChange}
            radius="xl"
            size="md"
            data={items.map((item) => ({
                value: item.value,
                label: (
                    <Flex>
                        <Image
                            alt=""
                            src={
                                flagImages[
                                    `${item.value.toUpperCase()}${colorScheme.colorScheme === "light" ? "Black" : "White"}`
                                ]
                            }
                            width={20}
                            height={20}
                        />
                    </Flex>
                ),
            }))}
            classNames={classes}
        />
    );
};
export default LanguageSwitcherButton;
