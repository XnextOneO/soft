/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { $authHost } from "@shared/api";
import { AxiosError } from "axios";

export const syncDataSCBank = async (link: string): Promise<any> => {
  try {
    const response = await $authHost.post(`${link}/sync`);
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
  try {
    const response = await $authHost.get(`${link}/${id}`);
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

export const getColumnsTable = async (link: string): Promise<any> => {
  try {
    const response = await $authHost.get(`${link}/columns/TABLE`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Произошла ошибка при получении колонок таблицы",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};

export const getColumnsCard = async (link: string): Promise<any> => {
  try {
    const response = await $authHost.get(`${link}/columns/CARD`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Произошла ошибка при получении колонок таблицы",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};
