"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Container,
  Group,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { userInfo } from "@/app/api/auth/authAPI";

import classes from "./UserProfile.module.css";
const UserProfilePage = observer(() => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const colorScheme = useMantineColorScheme();
  const [backgroundState, setBackgroundState] = useState<string>("");

  useEffect(() => {
    if (colorScheme.colorScheme === "light") {
      setBackgroundState(classes.mainContainerLight);
    } else {
      setBackgroundState(classes.mainContainerDark);
    }
  }, [colorScheme.colorScheme]);

  useEffect(() => {
    userInfo()
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container
      fluid
      mah="100vh"
      miw="700px"
      maw="100vw"
      className={backgroundState}
    >
      <Card withBorder>
        <Group wrap="nowrap">
          <Avatar name={name} color="initials" />
          <div>
            {/* <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Software engineer
          </Text> */}

            <Text fz="lg" fw={500} className={classes.name}>
              {name}
            </Text>

            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {email}
              </Text>
            </Group>

            {/* <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +11 (876) 890 56 23
            </Text>
          </Group> */}
          </div>
        </Group>
      </Card>
    </Container>
  );
});

export default UserProfilePage;
