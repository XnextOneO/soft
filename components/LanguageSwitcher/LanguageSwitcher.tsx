import { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Group,
    Menu,
    SegmentedControl,
    Text,
    UnstyledButton,
    useMantineColorScheme,
} from "@mantine/core";

import { getUserLocale, setUserLocale } from "@/i18n/locale-detector";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton = (): JSX.Element => {
    const colorScheme = useMantineColorScheme();
    const [locale, setLocale] = useState("ru");

    const items = [{ value: "ru" }, { value: "by" }];

    useEffect(() => {
        const fetchLocale = async (): Promise<void> => {
            const currentLocale = await getUserLocale();
            setLocale(currentLocale);
        };
        fetchLocale();
    }, []);

    const handleLocaleChange = async (value: string): Promise<void> => {
        const newLocale = value;
        await setUserLocale(newLocale);
        setLocale(newLocale);
    };

    return (
        // <SegmentedControl
        //     value={locale}
        //     onChange={handleLocaleChange}
        //     radius="xl"
        //     size="xs"
        //     data={items.map((item) => ({
        //         value: item.value,
        //         label: (
        //             <Flex>
        //                 <Text fw={600} size="sm">
        //                     {item.value.toUpperCase()}
        //                 </Text>
        //             </Flex>
        //         ),
        //     }))}
        //     classNames={classes}
        // />
        <Menu shadow="md" width={72} offset={0}>
            <Menu.Target>
                {/* <UnstyledButton > */}
                <Group justify="center" w={72} className={classes.switcher}>
                    <Text fw={700} c="#ffffff" style={{ textAlign: "center", lineHeight: "52px" }}>
                        {locale.toUpperCase()}
                    </Text>
                </Group>
                {/* </UnstyledButton> */}
            </Menu.Target>

            <Menu.Dropdown p={0}>
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
