import { FC } from "react";
import { useTranslations } from "next-intl";
import { Flex, Group, Pagination, Select, Text } from "@mantine/core";

interface BottomToolbarProperties {
    page: number;
    size: number;
    totalElements: number;
    countPages: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: any;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
}

const BottomToolbar: FC<BottomToolbarProperties> = ({
    page,
    size,
    totalElements,
    countPages,
    parameters,
    setPage,
    setSize,
}) => {
    const t = useTranslations("bottom-toolbar");

    const handleSizeChange = (value: string | null): void => {
        const newSize = Number(value);
        setSize(newSize);
        const lastPage = Math.ceil(totalElements / newSize);
        if (page > lastPage) {
            setPage(lastPage);
        } else {
            const newTotalPages = Math.ceil(totalElements / newSize);
            if (newTotalPages > countPages) {
                setPage(newTotalPages);
            }
        }
    };

    return (
        <Flex align="center" justify={"space-between"} pt={5} pb={10} w={"100%"}>
            <Text>
                {t("records")} {(page - 1) * size + 1}–{Math.min(page * size, totalElements)} {t("from")}{" "}
                {totalElements}
            </Text>
            <Group>
                <Text>{t("rows-count")}</Text>
                <Select
                    w={80}
                    placeholder={size.toString()}
                    data={["10", "20", "50", "100"]}
                    defaultValue="20"
                    allowDeselect={false}
                    value={size.toString()}
                    onChange={(event) => handleSizeChange(event)}
                />
                <Pagination
                    color="#007458"
                    total={countPages}
                    value={parameters.page + 1}
                    defaultValue={parameters.page}
                    onChange={setPage}
                />
            </Group>
        </Flex>
    );
};

export default BottomToolbar;
