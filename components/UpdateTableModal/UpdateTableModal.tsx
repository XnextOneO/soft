import { Modal, Button, Group, Text, rem } from "@mantine/core";
import { useRef } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";

const UpdateTableModal = ({
	opened,
	close,
}: {
	opened: boolean;
	close: () => void;
}) => {
	const openRef = useRef<() => void>(null);
	return (
		<Modal opened={opened} onClose={close} title="Обновить таблицу">
			<Dropzone
				openRef={openRef}
				onDrop={() => {}}
				// className={classes.dropzone}
				radius="md"
				accept={[MIME_TYPES.pdf]}
				maxSize={30 * 1024 ** 2}
			>
				<div style={{ pointerEvents: "none" }}>
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

					<Text ta="center" fw={700} fz="lg" mt="xl">
						<Dropzone.Accept>Drop files here</Dropzone.Accept>
						<Dropzone.Reject>
							Pdf file less than 30mb
						</Dropzone.Reject>
						<Dropzone.Idle>Upload resume</Dropzone.Idle>
					</Text>
					<Text ta="center" fz="sm" mt="xs" c="dimmed">
						Drag&apos;n&apos;drop files here to upload. We can
						accept only <i>.pdf</i> files that are less than 30mb in
						size.
					</Text>
				</div>
			</Dropzone>
		</Modal>
	);
};

export default UpdateTableModal;
