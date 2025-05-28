import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

import { $authHost } from "../index";

interface PostApiDataParameters {
  link: string;
  page: number;
  size: number;
  searchText?: string;
  sortCriteria?: {
    [key: string]: string;
  };
  // dataStatus: string;
}
interface ApiResponse {
  columnName: {
    [key: string]: string;
  };
  content: [];
  pageInfo: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export const postApiData = async (
  parameters: PostApiDataParameters,
): Promise<ApiResponse> => {
  const storedData = localStorage.getItem("auth-storage");

  const accessToken = storedData
    ? JSON.parse(storedData).state.accessToken
    : // eslint-disable-next-line unicorn/no-null
      null;
  try {
    const { link } = parameters;
    const response = await $authHost.post(`${link}/search`, parameters, {
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
          "Произошла ошибка при отправке данных",
        color: "red",
        autoClose: 5000,
      });
    }
    console.error("Error posting API data:", error);
    throw new Error("Failed to post API data");
  }
};
