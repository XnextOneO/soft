import { JSX, useState } from "react";
import {
  Button,
  Combobox,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Stack,
  TextInput,
  Title,
  useCombobox,
} from "@mantine/core";
import { getCountries } from "@shared/api/mutation/calendarAPI";
import { useQuery } from "@tanstack/react-query";

import classes from "./CalendarModals.module.scss";

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
  const [country, setCountry] = useState("");
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
    return item.shortName.toLowerCase().includes(country.toLowerCase().trim());
  });

  const options = Array.isArray(filteredItems)
    ? filteredItems.map((item) => ({
        value: item.code,
        label: item.shortName,
      }))
    : [];

  console.log(country);

  return data ? (
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
        <Flex direction="column">
          <Title order={5}>Выбор страны</Title>
          <Combobox
            onOptionSubmit={(option) => {
              setCountry(option);
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
                value={country}
                onChange={(event) => {
                  setCountry(event.currentTarget.value);
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
        <Flex direction="column">
          <Title order={5}>Примечание</Title>
          <TextInput />
        </Flex>
      </Stack>
      <Group gap={8} px={"16px"} py={"8px"}>
        <Button className={classes.button} disabled>
          Финансовые условия
        </Button>
        <Button className={classes.button} disabled>
          Прочее
        </Button>
      </Group>
    </Modal>
  ) : (
    <></>
  );
};
