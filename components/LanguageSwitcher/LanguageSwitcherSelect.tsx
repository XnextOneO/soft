"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Flex, SegmentedControl } from "@mantine/core";

import { Locale } from "@/i18n/config";

import BYFlag from "../../public/assets/BY.svg";
import RUFlag from "../../public/assets/RU.svg";

import classes from "./LanguageSwitcher.module.scss";

export interface ILanguageSwitcherProperties {
    value: string; // Изменено на value
    items: Array<{ value: string; label: string }>;
    label: string;
    onChange: (value: Locale) => void; // Добавлено onChange
}

const flagImages = {
    BY: BYFlag,
    RU: RUFlag,
    // Добавьте другие языки и их флаги здесь
};

export default function LanguageSwitcherSelect({
    value, // Используем value вместо defaultValue
    items,
    onChange, // Получаем onChange
}: ILanguageSwitcherProperties) {
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
                label: (
                    <Flex>
                        <Image alt="" src={flagImages[item.value.toUpperCase()]} width="30" height={20} />
                    </Flex>
                ),
            }))}
            classNames={classes}
        />
    );
}
