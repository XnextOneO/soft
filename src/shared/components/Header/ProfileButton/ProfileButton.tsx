"use client";

import { FC } from "react";
import { Avatar, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { userStore } from "@shared/store/userStore.ts";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";

import classes from "./ProfileButton.module.scss";

const ProfileButton: FC = () => {
  const router = useRouter();
  const { name, b } = userStore();

  return (
    <UnstyledButton
      className={classes.profile}
      px={10}
      onClick={() => router.navigate({ to: "/", replace: true })}
    >
      <Group>
        <Avatar color="white" radius="xl">
          {name
            .split(" ")
            .map((word) => word.slice(0, 1))
            .join("")}
        </Avatar>
        <Stack gap={0}>
          <Text size="md" fw={600} c="white" className={classes.nickname}>
            {name}
          </Text>
          <Text size="sm" fw={600} c="white" className={classes.nickname}>
            {b}
          </Text>
        </Stack>

        <IconChevronRight
          color="white"
          style={{ width: "rem(14)", height: "rem(14)" }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
};

export default ProfileButton;
