import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

import { $authHost } from "../index";

interface PostApiDataParameters {
  link: string;
  page: number;
  size: number;
  globalSearchText: string;
  columnSearchCriteria?: {
    [key: string]: string;
  };
  sortCriteria?: {
    [key: string]: string;
  };
  dataStatus: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postApiData = async (parameters: PostApiDataParameters): Promise<any> => {
  const storedData = localStorage.getItem("auth-storage");
  // eslint-disable-next-line unicorn/no-null
  const accessToken = storedData ? JSON.parse(storedData).state.accessToken : null;
  console.log(accessToken, "accestoken");
  try {
    const { link } = parameters;
    const response = await $authHost.post(`reference-book/${link}/search`, parameters, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
