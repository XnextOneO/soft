import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Burger,
  Container,
  Flex,
  Group,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import BelarusbankLogo from "@public/assets/belarusbank-logo.svg";
import Favicon from "@public/assets/favicon.svg";
import { MenuItem } from "@shared/components/NavMenu/NavMenu.tsx";
import ThemeSwitcher from "@shared/components/ThemeSwitcher/ThemeSwitcher.tsx";
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
const Header: FC<HeaderProperties> = ({
  isBurger,
  isProfile,
  link,
  toggleMenu,
  isMenuOpen,
}) => {
  const { t } = useTranslation(["header"]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
  //   const flatItems: MenuItem[] = [];
  //
  //   const recurseItems = (subItems: MenuItem[]): void => {
  //     for (const item of subItems) {
  //       flatItems.push(item);
  //       if (item.items) {
  //         recurseItems(item.items);
  //       }
  //     }
  //   };
  //
  //   recurseItems(items);
  //   return flatItems;
  // };
  // const flatMenuItems = flattenMenuItems(menuItems);
  // const filteredItems = flatMenuItems.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  // );
  return (
    <Container className={classes.headerContainer} fluid p={0}>
      <Flex w="100%" h="100%" direction="row">
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
        <Group justify="space-between" w="100%" pl={link ? 0 : "md"}>
          {link ? (
            <Link to={"/"}>
              <Group gap="xs" miw={280}>
                <Image
                  src={BelarusbankLogo}
                  w={24}
                  h={24}
                  alt="belarusbank-logo"
                />
                <Image src={Favicon} w={24} h={24} alt="logo" />
                <Text c="white" fw={700} className={classes.title}>
                  IIS {t("header:header.belarusbank")}
                </Text>
                <TextInput
                  w={350}
                  placeholder={t("header:header.search-placeholder")}
                />
              </Group>
            </Link>
          ) : (
            <Group gap="xs" maw={280}>
              <Image
                src={BelarusbankLogo}
                w={24}
                h={24}
                alt="belarusbank-logo"
              />
              <Image src={Favicon} w={24} h={24} alt="logo" />
              <Text c="white" fw={700} className={classes.title}>
                IIS {t("header:header.belarusbank")}
              </Text>
            </Group>
          )}
          <Group gap={0} justify="flex-end" align="center">
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
