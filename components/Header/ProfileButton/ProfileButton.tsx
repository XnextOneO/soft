"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import { userInfo } from "@/app/api/auth/authAPI";

import classes from "./ProfileButton.module.css";

const ProfileButton = (): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    userInfo()
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <UnstyledButton
      className={classes.profile}
      px={20}
      onClick={() => router.push("/user-profile")}
    >
      <Group>
        <Avatar name={name} color="initials" />

        <Text size="md" fw={600} c="white" className={classes.nickname}>
          {name}
        </Text>

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
