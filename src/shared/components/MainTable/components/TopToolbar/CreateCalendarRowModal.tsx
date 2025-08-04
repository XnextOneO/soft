import { JSX, useState } from "react";
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
import { notifications } from "@mantine/notifications";
import {
  getCountries,
  useCreateCalendarRow,
} from "@shared/api/mutation/calendarAPI";
import { useQuery } from "@tanstack/react-query";

import classes from "./CalendarModals.module.scss";

const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError("Неверный формат даты.");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const CreateCalendarRowModal = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const handleCloseCalendarCreateModal = (): void => {
    setOpened(false);
  };
  const { mutate } = useCreateCalendarRow();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState<string>("");
  const [weekendDate, setWeekendDate] = useState<string | null>();
  const [caption, setCaption] = useState<string>("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCountries"],
    queryFn: async () => {
      return await getCountries();
    },
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
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
    if (!weekendDate || !countryId) {
      notifications.show({
        title: "Ошибка",
        message: "Пожалуйста, выберите валидную страну и дату.",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

    mutate(
      {
        countryId: Number(countryId),
        weekendDate: formatDate(weekendDate),
        note: caption,
      },
      {
        onSuccess: (_data) => {
          setCountryId("");
          setCountryName("");
          setWeekendDate("");
          setCaption("");
          setOpened(false);
          return _data;
        },
        onError: (createError) => {
          console.log(createError);
        },
      },
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseCalendarCreateModal}
      title={"Добавить запись"}
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
                radius={"2px"}
                placeholder={"Выберите страну"}
                value={countryName}
                onChange={(event) => {
                  setCountryName(event.currentTarget.value);
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
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
            defaultDate={formattedDate}
            value={weekendDate}
            onChange={setWeekendDate}
            valueFormat="DD.MM.YYYY"
            placeholder="Введите дату"
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
          onClick={handleCloseCalendarCreateModal}
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
