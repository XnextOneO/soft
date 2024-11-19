import { $authHost } from "../index";

interface FetchApiDataParameters {
  link?: string;
  page?: number;
  size?: number;
  sort?: string;
  column?: string;
  text?: string;
}

export const fetchApiData = async (
  parameters: FetchApiDataParameters,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const response = await $authHost.get(`reference-book/${parameters.link}`, {
    params: parameters,
  });
  return response.data;
};

export const fetchApiDataWithSearch = async (
  parameters: FetchApiDataParameters,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const response = await $authHost.get(
    `reference-book/${parameters.link}/search`,
    {
      params: {
        searchText: parameters.text,
      },
    },
  );
  return response.data;
};
