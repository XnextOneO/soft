import {
	Modal,
	Button,
	Group,
	Text,
	rem,
	UnstyledButton,
	LoadingOverlay,
} from "@mantine/core";
import { useRef, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconUpload } from "@tabler/icons-react";
import { uploadDirectory } from "@/api/books/directoryAPI";
import classes from "./UpdateTableModal.module.css";
import { useDisclosure } from "@mantine/hooks";
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
	const openRef = useRef<() => void>(null);
	const [file, setFile] = useState<File | null>(null);
	const controller = new AbortController();

	const uploadFiles = async () => {
		const formData = new FormData();
		const boundary = "blob_boundary";

		const config = {
			headers: {
				"Content-Type": `multipart/form-data; boundary=${boundary}`,
			},
			signal: controller.signal,
			onUploadProgress: (progressEvent) => {
				console.log(progressEvent);
				
				// const percent = Math.round(
				// 	(progressEvent.loaded * 100) / progressEvent.total
				// );
				// console.log(`Загрузка файла: ${percent}%`);
				// // Отображение loading overlay и процентов загрузки
				// setProgress(percent);
			},
		};
		if (!file) {
			return;
		}
		try {
			formData.append(`file`, file);

			const status = await uploadDirectory(link, formData, config);
			console.log(status);

			if (status === 200) {
				close();
				toggle();
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
				// blur: 3,
			}}
			centered
		>
			<UnstyledButton className={classes.fileButton}>
				<Dropzone
					openRef={openRef}
					onDrop={(file) => {
						setFile(file[0]);
					}}
					// onLoad={(event) => {
					// 	console.log(`Selected file - ${event.target.files[0].name}`);
					// }}
					radius="md"
				>
					<div style={{ pointerEvents: "none" }}>
						<Group justify="center">
							<Dropzone.Accept>
								<IconUpload
									style={{ width: rem(50), height: rem(50) }}
									color="#006040"
									stroke={1.5}
								/>
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX
									style={{ width: rem(50), height: rem(50) }}
									color="red"
									stroke={1.5}
								/>
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconCloudUpload
									style={{ width: rem(50), height: rem(50) }}
									stroke={1.5}
								/>
							</Dropzone.Idle>
						</Group>

						<Text ta="center" fw={700} fz="lg" mt="md">
							<Dropzone.Accept>
								Поместите файл сюда
							</Dropzone.Accept>
							<Dropzone.Reject>Неправильный файл</Dropzone.Reject>
							<Dropzone.Idle>
								Загрузите файл справочника
							</Dropzone.Idle>
						</Text>
						<Text ta="center" fz="sm" my="md" c="dimmed">
							Перетащите в данную область файл справочника.
						</Text>
					</div>
				</Dropzone>
			</UnstyledButton>
			<Group justify="center">
				<Button color="#006040" onClick={uploadFiles}>
					Отправить на загрузку
				</Button>
			</Group>
			<LoadingOverlay
				visible={visible}
				zIndex={1000}
				loaderProps={{ children: progress }}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
		</Modal>
	);
};

export default UpdateTableModal;
