"use client";

import { Avatar, UnstyledButton, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./ProfileButton.module.css";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
	const router = useRouter();
	return (
		<UnstyledButton
			className={classes.profile}
			px={20}
			onClick={() => router.push("/login")}
		>
			<Group>
				<Avatar
					src="https://arsenalnn.com/wp-content/uploads/diler2-1.png"
					radius="lg"
					size="md"
				/>

				<Text size="md" fw={600} c="white" className={classes.nickname}>
					Иванов Иван Иванович
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
