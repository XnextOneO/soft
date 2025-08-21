import React, { JSX, useEffect, useState } from "react";
import {
  Button,
  Combobox,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import IconArrows from "@public/assets/IconArrows.svg?react";
import IconCalendar from "@public/assets/IconCalendar.svg?react";
import {
  getCountries,
  useUpdateCalendarRow,
} from "@shared/api/mutation/calendarAPI";
import { MainLoader } from "@shared/components/MainLoader/MainLoader.tsx";
import { formatDate } from "@shared/components/MainTable/components/TopToolbar/CreateCalendarRowModal.tsx";
import SvgButton from "@shared/components/SvgWrapper/SvgButton.tsx";
import { useQuery } from "@tanstack/react-query";
import { MRT_RowData } from "mantine-react-table";

import classes from "../TopToolbar/CalendarModals.module.scss";

export const CalendarEditModal = ({
  row,
  opened,
  setOpened,
  refetch,
}: {
  row: MRT_RowData | undefined;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}): JSX.Element => {
  const handleCloseCalendarEditModal = (): void => {
    setOpened(false);
  };

  const { mutate } = useUpdateCalendarRow();
  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState<string>("");
  const [weekendDate, setWeekendDate] = useState<string | null>("");
  const [caption, setCaption] = useState<string>("");
  const [errors, setErrors] = useState<{
    countryId: string;
    weekendDate: string;
  }>({
    countryId: "",
    weekendDate: "",
  });
  const weekendId: number = row?.getAllCells()[0].row.original.weekendId;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCountries"],
    queryFn: async () => {
      return await getCountries();
    },
  });

  useEffect(() => {
    if (row && data) {
      const countryNameFromRow = row.getAllCells()[0].row.original.country;
      setCountryName(countryNameFromRow);

      const country = data.find(
        (item) => item.shortName === countryNameFromRow,
      );
      setCountryId(country ? country.code.toString() : "");

      setWeekendDate(
        formatDate(row.getAllCells()[0].row.original.weekendDate, "yyyy-mm-dd"),
      );
      setCaption(row.getAllCells()[0].row.original.note);
    }
  }, [row, data]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (isError) {
    return <div>Ошибка загрузки данных</div>;
  }

  const filteredItems = data?.filter((item) => {
    return item.shortName
      .toLowerCase()
      .includes(countryName.toLowerCase().trim());
  });

  const options = Array.isArray(filteredItems)
    ? filteredItems.map((item) => ({
        value: item.code.toString(),
        label: item.shortName,
      }))
    : [];

  const submitForm = async (): Promise<void> => {
    let hasError = false;
    const newErrors = { countryId: "", weekendDate: "" };

    if (!countryId) {
      newErrors.countryId = "Пожалуйста, выберите валидную страну.";
      hasError = true;
    }

    if (!weekendDate) {
      newErrors.weekendDate = "Пожалуйста, выберите дату.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      console.log(errors);

      return;
    }

    if (weekendDate && !hasError) {
      mutate(
        {
          id: weekendId,
          countryId: Number(countryId),
          weekendDate: formatDate(weekendDate, "dd.mm.yyyy"),
          note: caption,
        },
        {
          onSuccess: (_data) => {
            setOpened(false);
            refetch();
            return _data;
          },
          onError: (createError) => {
            console.log(createError);
          },
        },
      );
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseCalendarEditModal}
      title={"Редактировать запись"}
      overlayProps={{
        backgroundOpacity: 0.55,
      }}
      centered
      classNames={{
        content: classes.content,
        body: classes.mantineModalBody,
        header: classes.header,
        title: classes.title,
        close: classes.close,
      }}
      size={"xs"}
    >
      <Stack gap={16} p={"16px"}>
        <Flex direction="column" gap={"4px"}>
          <Text fw={400} size={"14px"} lh={"100%"}>
            Выбор страны
          </Text>
          <Combobox
            onOptionSubmit={(option) => {
              const selectedOption = options.find(
                (opt) => opt.value === option,
              );
              if (selectedOption) {
                setCountryName(selectedOption.label);
                setCountryId(selectedOption.value);
                setErrors((previous) => ({ ...previous, countryId: "" }));
              }
              combobox.closeDropdown();
            }}
            store={combobox}
            offset={0}
          >
            <Combobox.Target>
              <TextInput
                classNames={{
                  wrapper: classes.searchInput,
                  input: classes.searchInput,
                }}
                rightSection={
                  <SvgButton SvgIcon={IconArrows} fillColor={"#999999"} />
                }
                radius={"2px"}
                placeholder={"Выберите страну"}
                value={countryName}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setCountryName(value);
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                  const selectedOption = options.find(
                    (opt) => opt.label.toLowerCase() === value.toLowerCase(),
                  );
                  if (selectedOption) {
                    setCountryId(selectedOption.value);
                    setErrors((previous) => ({ ...previous, countryId: "" }));
                  } else {
                    setCountryId("");
                    setErrors((previous) => ({ ...previous, countryId: "" }));
                  }
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => {
                  combobox.closeDropdown();
                  const selectedOption = options.find(
                    (opt) =>
                      opt.label.toLowerCase() === countryName.toLowerCase(),
                  );
                  if (selectedOption) {
                    setCountryId(selectedOption.value);
                  } else {
                    setCountryId("");
                  }
                }}
                error={errors.countryId}
              />
            </Combobox.Target>

            <Combobox.Dropdown style={{ borderRadius: 0 }}>
              <Combobox.Options>
                <ScrollArea.Autosize mah={200} type="scroll">
                  {options.length === 0 ? (
                    <Combobox.Empty style={{ textAlign: "start" }}>
                      Сожалеем, поиск не дал результатов
                    </Combobox.Empty>
                  ) : (
                    options.map((option) => (
                      <Combobox.Option
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </Combobox.Option>
                    ))
                  )}
                </ScrollArea.Autosize>
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Flex>
        <Flex direction="column" gap={"4px"}>
          <Text fw={400} size={"14px"} lh={"100%"}>
            Дата календаря
          </Text>
          <DateInput
            rightSection={
              <SvgButton SvgIcon={IconCalendar} fillColor={"#999999"} />
            }
            value={weekendDate}
            onChange={setWeekendDate}
            valueFormat="DD.MM.YYYY"
            placeholder="Введите дату"
            error={errors.weekendDate}
          />
        </Flex>
        <Flex direction="column" gap={"4px"}>
          <Text fw={400} size={"14px"} lh={"100%"}>
            Примечание
          </Text>
          <TextInput
            value={caption}
            onChange={(event) => setCaption(event.currentTarget.value)}
          />
        </Flex>
      </Stack>
      <Group w={"100%"} justify="flex-end" gap={8} px={"16px"} py={"8px"}>
        <Button
          className={classes.button}
          onClick={handleCloseCalendarEditModal}
        >
          Отменить
        </Button>
        <Button className={classes.button} onClick={submitForm}>
          Сохранить
        </Button>
      </Group>
    </Modal>
  );
};
