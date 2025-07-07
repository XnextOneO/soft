import { notifications } from "@mantine/notifications";
import { $authHost } from "@shared/api";
import { AxiosError } from "axios";

export const exportData = async (
  parameters: object,
  link: string,
  format: string,
): Promise<void> => {
  try {
    const response = await $authHost.post(
      `data-export${link}/${format.toLowerCase()}`,
      parameters,
      {
        responseType: "blob",
      },
    );

    if (response.status === 200) {
      const url = globalThis.URL.createObjectURL(new Blob([response.data]));
      const linkForDownload = document.createElement("a");
      linkForDownload.href = url;
      linkForDownload.setAttribute(
        "download",
        `exported_data_${format.toLowerCase()}.xlsx`,
      );
      document.body.append(linkForDownload);
      linkForDownload.click();
      linkForDownload.remove();
      notifications.show({
        title: "Успешно",
        message: `Выгрузка в ${format} прошла успешно`,
        color: "green",
        autoClose: 5000,
      });

      globalThis.URL.revokeObjectURL(url);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Произошла ошибка при выгрузке данных",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};
