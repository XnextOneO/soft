import { FC } from "react";
import { Group, Menu, Text } from "@mantine/core";

import classes from "./LanguageSwitcher.module.scss";
const LanguageSwitcherButton: FC = () => {
  return (
    <Menu shadow="md" width={72} offset={0}>
      <Menu.Target>
        <Group justify="center" w={72} className={classes.switcher}>
          <Text
            fw={700}
            c="#ffffff"
            style={{ textAlign: "center", lineHeight: "52px" }}
          ></Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown
        p={0}
        style={{ boxShadow: "0px 6px 35px 6px rgba(48, 48, 48, 0.2)" }}
      ></Menu.Dropdown>
    </Menu>
  );
};
export default LanguageSwitcherButton;
