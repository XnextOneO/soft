import React from "react";
import { Flex, MantineStyleProps, UnstyledButton } from "@mantine/core";

interface NavButtonProperties {
  w: number | string;
  className?: string;
  children: React.ReactNode;
}

const NavButton = ({ children, className, ...rest }: NavButtonProperties) => {
  return (
    <Flex align="center" className={className} {...rest}>
      {children}
    </Flex>
  );
};

export default NavButton;
