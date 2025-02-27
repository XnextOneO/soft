import { useEffect, useState } from "react";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";

import { defaultLocale, Locale, locales } from "@/i18n/config";
import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton = (): JSX.Element => {
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const items: { value: Locale }[] = locales.map((locale) => ({ value: locale }));
    useEffect(() => {
        const fetchLocale = async (): Promise<void> => {
            const currentLocale = await getUserLocale();
            if (locales.includes(currentLocale as Locale)) {
                setLocale(currentLocale as Locale);
            } else {
                setLocale(defaultLocale);
            }
        };
        fetchLocale();
    }, []);

    const handleLocaleChange = async (value: Locale): Promise<void> => {
        await setUserLocale(value);
        setLocale(value);
    };

    return (
        <Menu shadow="md" width={72} offset={0}>
            <Menu.Target>
                <Group justify="center" w={72} className={classes.switcher}>
                    <Text fw={700} c="#ffffff" style={{ textAlign: "center", lineHeight: "52px" }}>
                        {locale.toUpperCase()}
                    </Text>
                </Group>
            </Menu.Target>

            <Menu.Dropdown p={0} style={{ boxShadow: "0px 6px 35px 6px rgba(48, 48, 48, 0.2)" }}>
                {items.map((item) => (
                    <Menu.Item key={item.value} onClick={() => handleLocaleChange(item.value)}>
                        <UnstyledButton className={classes.switcherItem}>{item.value.toUpperCase()}</UnstyledButton>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
export default LanguageSwitcherButton;
