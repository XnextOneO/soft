import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Flex, SegmentedControl } from "@mantine/core";

import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import BY from "../../public/assets/BY.svg";
import RU from "../../public/assets/RU.svg";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton = (): JSX.Element => {
    const [locale, setLocale] = useState("ru");
    const flagImages: Record<string, StaticImageData> = {
        BY: BY,
        RU: RU,
    };
    const items = [{ value: "ru" }, { value: "by" }];

    useEffect(() => {
        const fetchLocale = async (): Promise<void> => {
            const currentLocale = await getUserLocale();
            setLocale(currentLocale);
        };
        fetchLocale().then(r => r);
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
                            src={flagImages[item.value.toUpperCase() as keyof typeof flagImages]}
                            width="30"
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
