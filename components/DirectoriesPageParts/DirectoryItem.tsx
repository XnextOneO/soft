import Link from "next/link";
import { Text, UnstyledButton } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";

import classes from "../../app/(root)/directories/Directories.module.css";
interface DirectoryItemProperties {
  directory: {
    link: string;
    name: string;
  };
  colorScheme: "light" | "dark" | "auto";
}

const DirectoryItem: React.FC<DirectoryItemProperties> = ({
  directory,
  colorScheme,
}) => {
  return (
    <Link
      style={{
        width: "50%",
        textDecoration: "none",
      }}
      href={`/directories/${directory.link}`}
    >
      <UnstyledButton className={classes.item}>
        <IconBook color={colorScheme === "dark" ? "#c9c9c9" : "black"} />
        <Text size="sm" mt={7} c={colorScheme === "dark" ? "#c9c9c9" : "black"}>
          {directory.name}
        </Text>
      </UnstyledButton>
    </Link>
  );
};

export default DirectoryItem;
