import { $host } from "../index";

interface FetchApiDataParameters {
  link?: string;
  page?: number;
  size?: number;
  sort?: string;
  column?: string;
}

export const fetchApiData = async (
  parameters: FetchApiDataParameters,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const response = await $host.get(`reference-book/${parameters.link}`, {
    params: parameters,
  });
  return response.data;
};
