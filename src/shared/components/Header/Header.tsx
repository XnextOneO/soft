import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Burger,
  Combobox,
  Container,
  Flex,
  Group,
  Image,
  ScrollArea,
  TextInput,
  useCombobox,
  useMantineColorScheme,
} from "@mantine/core";
import BelarusbankLogo from "@public/assets/logotip.svg";
import menuItems from "@public/menuItems.json";
import DocumentationButton from "@shared/components/Header/DocumentationButton/DocumentationButton.tsx";
import { MenuItem } from "@shared/components/Menu";
import ThemeSwitcher from "@shared/components/ThemeSwitcher/ThemeSwitcher.tsx";
import { usePermissionsStore } from "@shared/store/permissionStore.ts";
import { Link } from "@tanstack/react-router";

import ProfileButton from "./ProfileButton/ProfileButton";
import classes from "./Header.module.scss";
interface HeaderProperties {
  isBurger: boolean;
  isProfile: boolean;
  link?: boolean;
  toggleMenu?: () => void;
  isMenuOpen?: boolean;
}
const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
  const flatItems: MenuItem[] = [];

  const recurseItems = (subItems: MenuItem[]): void => {
    for (const item of subItems) {
      if (item.href) {
        flatItems.push(item);
      }
      if (item.items) {
        recurseItems(item.items);
      }
    }
  };

  recurseItems(items);
  return flatItems;
};

const Header: FC<HeaderProperties> = ({
  isBurger,
  isProfile,
  link,
  toggleMenu,
  isMenuOpen,
}) => {
  const combobox = useCombobox();
  const colorScheme = useMantineColorScheme();
  const { t } = useTranslation(["header"]);
  const [searchTerm, setSearchTerm] = useState("");
  const { permissions } = usePermissionsStore();

  const flatMenuItems = flattenMenuItems(menuItems);
  const shouldFilterOptions = !flatMenuItems.some(
    (item) => t(item.name) === searchTerm,
  );
  const filteredItems = shouldFilterOptions
    ? flatMenuItems.filter((item) => {
        const hasPermission = permissions.includes(`${item.key}:read`);
        return (
          hasPermission &&
          t(item.name).toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      })
    : flatMenuItems.filter((item) => permissions.includes(`${item.key}:read`));
  const options = filteredItems.map((item) => (
    <Link
      key={item.key + item.href}
      to={item.href}
      // params={{
      //   slug: item.href ?? "",
      // }}
      style={{
        textDecoration: "none",
        color: colorScheme.colorScheme === "light" ? "#333333" : "#CCCCCC",
      }}
    >
      <Combobox.Option value={t(item.name)}>{t(item.name)}</Combobox.Option>
    </Link>
  ));

  return (
    <Container className={classes.headerContainer} fluid p={0}>
      <Flex w="100%" h="100%" direction="row">
        <Flex w={link ? 350 : ""} align={"center"}>
          {isBurger && (
            <Flex
              justify="center"
              align="center"
              className={classes.buttonContainer}
              onClick={toggleMenu}
              w={72}
              miw={72}
            >
              <Burger
                size="sm"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                opened={isMenuOpen}
                aria-label={t("header:header.navigation")}
              />
            </Flex>
          )}
          {link && (
            <Link to={"/"}>
              <Flex direction={"row"} align={"center"} gap="xs">
                <Image src={BelarusbankLogo} />
              </Flex>
            </Link>
          )}
        </Flex>
        <Group justify="space-between" w="100%" pl={link ? 0 : "md"}>
          {link ? (
            <Group miw={280} gap={"sm"}>
              <Combobox
                onOptionSubmit={() => {
                  setSearchTerm("");
                  combobox.closeDropdown();
                }}
                store={combobox}
              >
                <Combobox.Target>
                  <TextInput
                    w={"450px"}
                    placeholder={t("header:header.search-placeholder")}
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.currentTarget.value);
                      combobox.openDropdown();
                      combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                  />
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                      {options.length === 0 ? (
                        <Combobox.Empty>Ничего не найдено</Combobox.Empty>
                      ) : (
                        options
                      )}
                    </ScrollArea.Autosize>
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
            </Group>
          ) : (
            <Group gap="xs" maw={280}>
              <Image src={BelarusbankLogo} />
            </Group>
          )}
          <Group gap={0} justify="flex-end" align="center">
            <DocumentationButton />
            <ThemeSwitcher />
            {/*<LanguageSwitcher />*/}
            {isProfile && <ProfileButton />}
          </Group>
        </Group>
      </Flex>
    </Container>
  );
};

export default Header;
