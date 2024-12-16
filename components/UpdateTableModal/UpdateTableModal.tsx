import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Group,
    LoadingOverlay,
    Modal,
    rem,
    RingProgress,
    Stack,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications"; // Импортируем showNotification
import { IconCheck, IconCloudUpload, IconFile, IconUpload, IconX } from "@tabler/icons-react";
import { AxiosProgressEvent } from "axios";

import { uploadDirectory } from "@/app/api/books/directoryAPI";

import classes from "./UpdateTableModal.module.scss";

const UpdateTableModal = ({
    link,
    opened,
    close,
}: {
    link: string;
    opened: boolean;
    close: () => void;
}): JSX.Element => {
    const [visible, { toggle }] = useDisclosure(false);
    const [progress, setProgress] = useState<number>(0);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const openReference = useRef<() => void>(null);
    const [file, setFile] = useState<File | null>();
    const controller = new AbortController();
    const t = useTranslations("upload-file");

    const uploadFiles = async (): Promise<void> => {
        const formData = new FormData();

        const config = {
            signal: controller.signal,
            onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
                console.log(progressEvent);
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                setProgress(percentCompleted);
            },
        };

        if (!file) {
            return;
        }

        try {
            formData.append(`file`, file);
            toggle();
            const status = await uploadDirectory(link, formData, config);
            console.log(status);

            if (status === 200) {
                setUploaded(true);
                setError(false);
            }
        } catch (error: any) {
            console.error(error.message);
            setError(true);

            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    showNotification({
                        title: t("upload-error-title"),
                        message: error.response.data.message,
                        color: "red",
                        autoClose: false,
                    });
                } else {
                    showNotification({
                        title: t("upload-error-title"),
                        message: "Произошла неизвестная ошибка.",
                        color: "red",
                        autoClose: false,
                    });
                }
            } else {
                showNotification({
                    title: t("upload-error-title"),
                    message: "Произошла ошибка сети или сервер недоступен.",
                    color: "red",
                    autoClose: false,
                });
            }
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => {
                close();
                controller.abort();
                setFile(undefined);
                setUploaded(false);
                setError(false);
                if (progress > 1) {
                    toggle();
                }
                setProgress(0);
            }}
            title={t("modal-title")}
            overlayProps={{
                backgroundOpacity: 0.55,
            }}
            centered
            className={classes.relative}
        >
            <UnstyledButton className={classes.fileButton}>
                {file ? (
                    <Card withBorder radius="md" mt="md">
                        <Stack>
                            <IconFile width="100%" />
                            <Text fz="sm">{file.name}</Text>
                            <Button
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    setFile(undefined);
                                }}
                            >
                                <IconX />
                            </Button>
                        </Stack>
                    </Card>
                ) : (
                    <Dropzone
                        openRef={openReference}
                        onDrop={(droppedFile) => {
                            setFile(droppedFile[0]);
                        }}
                        radius="md"
                    >
                        <div style={{ pointerEvents: "none" }}>
                            <Group justify="center">
                                <Dropzone.Accept>
                                    <IconUpload
                                        style={{
                                            width: rem(50),
                                            height: rem(50),
                                        }}
                                        color="#006040"
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        style={{
                                            width: rem(50),
                                            height: rem(50),
                                        }}
                                        color="red"
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconCloudUpload
                                        style={{
                                            width: rem(50),
                                            height: rem(50),
                                        }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>
                            </Group>

                            <Text ta="center" fw={700} fz="lg" mt="md">
                                <Dropzone.Accept>{t("dropzone-accept")}</Dropzone.Accept>
                                <Dropzone.Reject>{t("dropzone-reject")}</Dropzone.Reject>
                                <Dropzone.Idle>{t("dropzone-idle")}</Dropzone.Idle>
                            </Text>
                            <Text ta="center" fz="sm" my="md" c="dimmed">
                                {t("dropzone-description")}
                            </Text>
                        </div>
                    </Dropzone>
                )}
            </UnstyledButton>

            <Group justify="center">
                <Button color="#006040" onClick={uploadFiles} disabled={!file}>
                    {t("upload-button")}
                </Button>
            </Group>
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                className={classes.absolute}
                loaderProps={{
                    children: (
                        <>
                            {uploaded ? (
                                <RingProgress
                                    sections={[{ value: 100, color: "teal" }]}
                                    label={
                                        <Center
                                            onClick={() => {
                                                close();
                                                setFile(undefined);
                                                setUploaded(false);
                                                setProgress(0);
                                                setError(false);
                                                toggle();
                                            }}
                                        >
                                            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
                                                <IconCheck
                                                    style={{
                                                        width: rem(22),
                                                        height: rem(22),
                                                    }}
                                                />
                                            </ActionIcon>
                                        </Center>
                                    }
                                />
                            ) : // eslint-disable-next-line sonarjs/no-nested-conditional
                            error ? (
                                <RingProgress
                                    sections={[{ value: 100, color: "red" }]}
                                    label={
                                        <Center
                                            onClick={() => {
                                                close();
                                                setFile(undefined);
                                                setUploaded(false);
                                                setProgress(0);
                                                setError(false);
                                                toggle();
                                            }}
                                        >
                                            <ActionIcon color="red" variant="light" radius="xl" size="xl">
                                                <IconX color={"red"} />
                                            </ActionIcon>
                                        </Center>
                                    }
                                />
                            ) : (
                                <RingProgress
                                    sections={[{ value: progress, color: "#00885b" }]}
                                    label={
                                        <Text c="#00b478" fw={700} ta="center" size="xl">
                                            {progress}%
                                        </Text>
                                    }
                                />
                            )}
                        </>
                    ),
                }}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
        </Modal>
    );
};

export default UpdateTableModal;
