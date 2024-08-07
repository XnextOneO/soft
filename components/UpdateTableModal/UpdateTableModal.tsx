import { Modal, Button, Group, Text, rem, UnstyledButton } from "@mantine/core";
import { useRef, useState } from "react";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import { uploadDirectory } from "@/api/books/directoryAPI";
import classes from "./UpdateTableModal.module.css";
const UpdateTableModal = ({
	link,
	opened,
	close,
}: {
	link: string;
	opened: boolean;
	close: () => void;
}) => {
	const openRef = useRef<() => void>(null);
	const [file, setFile] = useState<File | null>(null);

	const uploadFiles = async () => {
		const formData = new FormData();

		const boundary = "blob_boundary";
		const config = {
			headers: {
				"Content-Type": `multipart/form-data; boundary=${boundary}`,
			},
		};
		if (!file) {
			return;
		}
		try {
			formData.append(`file`, file);

			const data = await uploadDirectory(link, formData, config);
			close();
			if (data) {
				console.log(data);
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	return (
		<Modal
			opened={opened}
			onClose={close}
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
						if(file[0]) {
							
						}
					}}
					// onLoad={}
					radius="md"
				>
					<div style={{pointerEvents: 'none'}}>
						<Group justify="center">
							<Dropzone.Accept>
								<IconDownload
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
		</Modal>
	);
};

export default UpdateTableModal;
