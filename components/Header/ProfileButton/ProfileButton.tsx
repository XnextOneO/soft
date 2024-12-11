"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import { userInfo } from "@/app/api/auth/authAPI";

import classes from "./ProfileButton.module.scss";

const ProfileButton = (): JSX.Element => {
    const router = useRouter();
    const [name, setName] = useState<string>("");

    useEffect(() => {
        userInfo()
            // eslint-disable-next-line promise/always-return
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setName(data.name);
            })
            .catch((error) => console.error(error));
    }, []);
    return (
        <UnstyledButton className={classes.profile} px={20} onClick={() => router.push("/user-profile")}>
            <Group>
                <Text size="md" fw={600} c="white" className={classes.nickname}>
                    {name}
                </Text>

                <IconChevronRight color="white" style={{ width: "rem(14)", height: "rem(14)" }} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
};

export default ProfileButton;
