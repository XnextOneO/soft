import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { $authHost } from "../index";

interface PostApiDataParameters {
  link: string;
  page: number;
  size: number;
  columnSearchCriteria?: {
    [key: string]: string;
  };
  sortCriteria?: {
    [key: string]: string;
    sortOrder: string;
  };
  dataStatus: string;
}

export const postApiData = async (parameters: PostApiDataParameters): Promise<any> => {
  try {
    const { link } = parameters;
    const response = await $authHost.post(`reference-book/${link}/search`, parameters);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message: error.response?.data?.message || "Произошла ошибка при отправке данных",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};
