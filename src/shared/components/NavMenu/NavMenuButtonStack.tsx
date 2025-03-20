import { SVGProps, useEffect, useState } from "react";
import React from "react";
import { Text } from "@mantine/core";

import NavButton from "../BurgerButtons/NavButton";
import SvgButton from "../SvgWrapper/SvgButton";

import classes from "./NavMenu.module.scss";

interface INavMenuButtonStackProperties {
  colorScheme: string;
  active?: boolean;
  width: number;
  marginLeft: number;
  icon: SVGProps<SVGSVGElement>;
  children?: React.ReactNode;
}

const NavMenuButtonStack: React.FC<INavMenuButtonStackProperties> = ({
  colorScheme,
  active,
  width,
  marginLeft,
  icon,
  children,
}) => {
  const [iconColorState, setIconColorState] = useState<string>("");

  let navButtonClass;
  let pathColor;

  if (active) {
    navButtonClass = classes.navButtonActive;
    pathColor = "#FFFFFF";
  } else if (colorScheme === "dark") {
    navButtonClass = classes.navButtonDark;
    pathColor = "#FFFFFF";
  } else {
    navButtonClass = classes.navButton;
    pathColor = "#333333";
  }

  useEffect(() => {
    setIconColorState(pathColor);
  }, [active, colorScheme, pathColor]);

  return (
    <NavButton className={navButtonClass} w={width}>
      <SvgButton
        SvgIcon={icon}
        fillColor={iconColorState}
        style={{
          minWidth: "52px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Text
        c={active ? "#c9c9c9" : ""}
        ml={marginLeft}
        style={{ lineHeight: "20px" }}
      >
        {children}
      </Text>
    </NavButton>
  );
};

export default NavMenuButtonStack;
