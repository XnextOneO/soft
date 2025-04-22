import { FC } from "react";
import { Group, Image, Tooltip } from "@mantine/core";
import IconInfo from "@public/assets/info.svg";

import classes from "./DocumentationButton.module.scss";

const DocumentationButton: FC = () => {
  return (
    <Tooltip label="Справка (F1)" withArrow>
      <Group
        justify="center"
        w={52}
        h="52px"
        className={classes.documentationButton}
      >
        <Image src={IconInfo} />
      </Group>
    </Tooltip>
  );
};

export default DocumentationButton;
