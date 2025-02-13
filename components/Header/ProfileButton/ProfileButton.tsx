"use client";

import { useRouter } from "next/navigation";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import { userStore } from "@/store/userStore";

import classes from "./ProfileButton.module.scss";

const ProfileButton = (): JSX.Element => {
    const router = useRouter();
    const { name } = userStore();

    return (
        <UnstyledButton className={classes.profile} px={10} onClick={() => router.push("/user-profile")}>
            <Group>
                <Avatar color="white" radius="xl">
                    {name
                        .split(" ")
                        .map((word) => word.slice(0, 1))
                        .join("")}
                </Avatar>
                <Text size="md" fw={600} c="white" className={classes.nickname}>
                    {name}
                </Text>

                <IconChevronRight color="white" style={{ width: "rem(14)", height: "rem(14)" }} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
};

export default ProfileButton;
