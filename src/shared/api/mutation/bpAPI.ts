/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { $authHost } from "@shared/api";
import { AxiosError } from "axios";

export const syncDataSCBank = async (link: string): Promise<any> => {
  const storedData = localStorage.getItem("auth-storage");

  const accessToken = storedData
    ? JSON.parse(storedData).state.accessToken
    : // eslint-disable-next-line unicorn/no-null
      null;
  try {
    const response = await $authHost.post(`${link}/sync`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      notifications.show({
        title: "Успешно",
        message: "Данные обновлены",
        color: "green",
        autoClose: 5000,
      });
    }
    return response.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Произошла ошибка при синхронищации данных",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};

export const getBPInfo = async (link: string, id: number): Promise<any> => {
  const storedData = localStorage.getItem("auth-storage");

  const accessToken = storedData
    ? JSON.parse(storedData).state.accessToken
    : // eslint-disable-next-line unicorn/no-null
      null;
  try {
    const response = await $authHost.get(`${link}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Произошла ошибка при синхронищации данных",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};
