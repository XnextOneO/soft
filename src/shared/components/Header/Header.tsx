import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Burger,
  Container,
  Flex,
  Group,
  Image as MantineImage,
  Text,
} from "@mantine/core";
import LanguageSwitcher from "@shared/components/LanguageSwitcher/LanguageSwitcher.tsx";
import ThemeSwitcher from "@shared/components/ThemeSwitcher/ThemeSwitcher.tsx";
import { Link } from "@tanstack/react-router";

import ProfileButton from "./ProfileButton/ProfileButton";
import classes from "./Header.module.scss";

interface HeaderProperties {
  isBurger: boolean;
  isProfile: boolean;
  link?: boolean;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}
const Header: FC<HeaderProperties> = ({
  isBurger,
  isProfile,
  link,
  toggleMenu,
  isMenuOpen,
}) => {
  const { t } = useTranslation(["header"]);

  return (
    <Container className={classes.headerContainer} fluid p={0}>
      <Flex w="100%" h="100%" direction="row">
        {isBurger && (
          <Flex
            justify="center"
            align="center"
            className={classes.buttonContainer}
            onClick={toggleMenu}
            w={52}
            miw={52}
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
              aria-label={t("navigation")}
            />
          </Flex>
        )}
        <Group justify="space-between" w="100%" pl="md">
          {link ? (
            <Link to={"/"}>
              <Group gap="xs">
                <MantineImage
                  src="../../favicon.png"
                  w={30}
                  h={30}
                  alt="logo"
                />
                <Text c="white" size="20px" fw={700} className={classes.title}>
                  IIS {t("belarusbank")}
                </Text>
              </Group>
            </Link>
          ) : (
            <Group gap="xs">
              <MantineImage src="../../favicon.png" w={30} h={30} alt="logo" />
              <Text c="white" size="20px" fw={700} className={classes.title}>
                IIS {t("belarusbank")}
              </Text>
            </Group>
          )}
          <Group gap={0} justify="flex-end" align="center">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {isProfile && <ProfileButton />}
          </Group>
        </Group>
      </Flex>
    </Container>
  );
};

export default Header;
