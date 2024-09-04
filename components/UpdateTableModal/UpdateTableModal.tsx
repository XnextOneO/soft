import {
	Modal,
	Button,
	Group,
	Text,
	rem,
	UnstyledButton,
	LoadingOverlay,
	RingProgress,
	Card,
	ActionIcon,
	Center,
	Stack,
} from "@mantine/core";
import { useRef, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import {
	IconCloudUpload,
	IconX,
	IconUpload,
	IconCheck,
	IconFile,
} from "@tabler/icons-react";
import { uploadDirectory } from "@/app/api/books/directoryAPI";
import classes from "./UpdateTableModal.module.css";
import { useDisclosure } from "@mantine/hooks";
import { AxiosProgressEvent } from "axios";
const UpdateTableModal = ({
	link,
	opened,
	close,
}: {
	link: string;
	opened: boolean;
	close: () => void;
}) => {
	const [visible, { toggle }] = useDisclosure(false);
	const [progress, setProgress] = useState<number>(0);
	const [uploaded, setUploaded] = useState<boolean>(false);
	const openRef = useRef<() => void>(null);
	const [file, setFile] = useState<File | null>(null);
	const controller = new AbortController();

	const uploadFiles = async () => {
		const formData = new FormData();

		const config = {
			signal: controller.signal,
			onUploadProgress: (progressEvent: AxiosProgressEvent) => {
				console.log(progressEvent);
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / (progressEvent.total ?? 1)
				);
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
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	return (
		<Modal
			opened={opened}
			onClose={() => {
				close();
				controller.abort();
			}}
			title="Обновить таблицу"
			overlayProps={{
				backgroundOpacity: 0.55,
			}}
			centered
		>
			<UnstyledButton className={classes.fileButton}>
				{!file ? (
					<Dropzone
						openRef={openRef}
						onDrop={(file) => {
							setFile(file[0]);
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
								<Dropzone.Accept>
									Поместите файл сюда
								</Dropzone.Accept>
								<Dropzone.Reject>
									Неправильный файл
								</Dropzone.Reject>
								<Dropzone.Idle>
									Загрузите файл справочника
								</Dropzone.Idle>
							</Text>
							<Text ta="center" fz="sm" my="md" c="dimmed">
								Перетащите в данную область файл справочника.
							</Text>
						</div>
					</Dropzone>
				) : (
					<Card withBorder radius="md" mt="md">
						<Stack>
							<IconFile width="100%" />
							<Text fz="sm">{file.name}</Text>

							<Button
								variant="subtle"
								color="red"
								onClick={() => {
									setFile(null);
								}}
							>
								<IconX />
							</Button>
						</Stack>
					</Card>
				)}
			</UnstyledButton>

			<Group justify="center">
				<Button color="#006040" onClick={uploadFiles} disabled={!file}>
					Отправить на загрузку
				</Button>
			</Group>
			<LoadingOverlay
				visible={visible}
				zIndex={1000}
				loaderProps={{
					children: (
						<>
							{!uploaded ? (
								<RingProgress
									sections={[
										{ value: progress, color: "#00885b" },
									]}
									label={
										<Text
											c="#00b478"
											fw={700}
											ta="center"
											size="xl"
										>
											{progress}%
										</Text>
									}
								/>
							) : (
								<RingProgress
									sections={[{ value: 100, color: "teal" }]}
									label={
										<Center
											onClick={() => {
												close();
												setFile(null);
												setUploaded(false);
												setProgress(0);
												toggle();
											}}
										>
											<ActionIcon
												color="teal"
												variant="light"
												radius="xl"
												size="xl"
											>
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
