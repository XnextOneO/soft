import { AxiosRequestConfig } from "axios";

import { $host } from "../index";

export const getDirectory = async (
  link: string,
  page: number,
  size: number,
  sorting: { id: string; desc: string } | unknown,
): Promise<object | undefined> => {
  if (typeof sorting === "object" && sorting !== null) {
    if (Object.keys(sorting).length > 0) {
      const { data } = await $host.get(`reference-book/${link}`, {
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
        },
      });
      return data;
    }
    return undefined;
  } else {
    const { data } = await $host.get(`reference-book/${link}`, {
      params: {
        page,
        size,
      },
    });
    return data;
  }
};

export const uploadDirectory = async (
  link: string,
  formData: FormData,
  config: AxiosRequestConfig<undefined> | undefined,
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
): Promise<object | undefined> => {
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
