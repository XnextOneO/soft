import axios, { AxiosRequestConfig } from "axios";

import { $host } from "../index";

export const getDirectory = async (
  link: string,
  page: number,
  size: number,
  sorting: { id: string; desc: string } | object,
  // eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
): Promise<any> => {
  const parameters: {
    page: number;
    size: number;
    sort?: string;
    column?: string;
  } = {
    page,
    size,
  };

  if (Object.keys(sorting).length > 0 && sorting) {
    parameters.sort = (sorting as { id: string; desc: string })?.desc;
    parameters.column = (sorting as { id: string; desc: string })?.id
      .replaceAll(/(?<=[a-z])([A-Z])/gm, (match) =>
        match.replace(match, `_${match}`),
      )
      .replaceAll(/(?<!^)\s/gm, "_")
      .toUpperCase();
  }

  try {
    const response = await $host.get(`reference-book/${link}`, {
      params: parameters,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const isRefreshValid = await refreshToken();
        return isRefreshValid
          ? getDirectory(link, page, size, sorting)
          : Promise.reject(error);
      }
    } else {
      console.log(error);
    }
  }
};

export const uploadDirectory = async (
  link: string,
  formData: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined,
): Promise<number> => {
  const { status } = await $host.post(
    `reference-book/${link}`,
    formData,
    config,
  );
  return status;
};

export const searchDataInDirectory = async (
  link: string,
  page: number,
  size: number,
  sorting: { id: string; desc: string } | object,
  searchValue: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  if (Object.keys(sorting).length > 0 && sorting) {
    const { data } = await $host.get(`reference-book/${link}/search`, {
      params: {
        page,
        size,
        sort: (sorting as { id: string; desc: string })?.desc,
        column: (sorting as { id: string; desc: string })?.id
          .replaceAll(/(?<=[a-z])([A-Z])/gm, (match) =>
            match.replace(match, `_${match}`),
          )
          .replaceAll(/(?<!^)\s/gm, "_")
          .toUpperCase(),
        text: searchValue ?? "",
      },
    });
    return data;
  } else {
    const { data } = await $host.get(`reference-book/${link}/search`, {
      params: {
        page,
        size,
        text: searchValue ?? "",
      },
    });
    return data;
  }
};

// eslint-disable-next-line consistent-return
const refreshToken = async (): Promise<unknown> => {
  try {
    const { status } = await $host.post("/auth/refresh-token");
    if (status === 200) {
      return true;
    }
  } catch (error) {
    // console.log(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
  }
};
