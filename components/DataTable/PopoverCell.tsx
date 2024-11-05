import React from "react";
import { Popover, Text } from "@mantine/core";

interface ICellProperties {
  children?: number | string;
  onDoubleClick?: () => void;
}

const PopoverCell: React.FC<ICellProperties> = ({ children }) => {
  return (
    <Popover
      width={"auto"}
      position="bottom-start"
      withArrow
      shadow="md"
      styles={{
        dropdown: {
          maxWidth: "30%",
          left: 0,
        },
      }}
    >
      <Popover.Target>
        <Text truncate="end" size="sm">
          {children}
        </Text>
      </Popover.Target>
      <Popover.Dropdown style={{ wordWrap: "break-word" }}>
        <Text size="xs">{children}</Text>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PopoverCell;
