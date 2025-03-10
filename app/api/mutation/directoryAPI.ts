import { AxiosRequestConfig, AxiosResponse } from "axios";

import { $authHost } from "../index";

/**
 * Converts camelCase to snake_case for API parameters
 * @param input - Input string in camelCase
 * @returns Converted string in snake_case
 */
const convertToSnakeCase = (input: string): string => {
  return input
    .replaceAll(/(?<=[a-z])([A-Z])/gm, (match) => `_${match}`)
    .replaceAll(/(?<!^)\s/gm, "_")
    .toUpperCase();
};

/**
 * Sorting configuration interface
 */
interface SortingConfig {
  id: string;
  desc: string;
}

/**
 * Retrieves directory data with pagination and sorting
 * @param link - Endpoint link
 * @param page - Page number
 * @param size - Page size
 * @param sorting - Sorting configuration
 * @returns Directory data
 */
export const getDirectory = async <T = unknown>(
  link: string,
  page: number,
  size: number,
  sorting: Partial<SortingConfig> = {},
): Promise<T | undefined> => {
  const parameters: {
    page: number;
    size: number;
    sort?: string;
    column?: string;
  } = { page, size };

  if (Object.keys(sorting).length > 0) {
    const sortConfig = sorting as SortingConfig;
    parameters.sort = sortConfig.desc;
    parameters.column = convertToSnakeCase(sortConfig.id);
  }

  try {
    const response: AxiosResponse<T> = await $authHost.get(`reference-book/${link}`, {
      params: parameters,
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching directory:", error);
    return undefined;
  }
};

/**
 * Uploads data to a directory
 * @param link - Endpoint link
 * @param formData - Form data to upload
 * @param config - Axios request configuration
 * @returns HTTP status code
 */
export const uploadDirectory = async (
  link: string,
  formData: FormData,
  config?: AxiosRequestConfig,
): Promise<number> => {
  try {
    const { status } = await $authHost.post(`reference-book/${link}/upload-file`, formData, config);
    return status;
  } catch (error: unknown) {
    console.error("Error uploading directory:", error);
    throw error;
  }
};

/**
 * Searches data in a directory with optional sorting
 * @param link - Endpoint link
 * @param page - Page number
 * @param size - Page size
 * @param sorting - Sorting configuration
 * @param searchValue - Search query
 * @returns Searched directory data
 */
export const searchDataInDirectory = async <T = unknown>(
  link: string,
  page: number,
  size: number,
  sorting: Partial<SortingConfig> = {},
  searchValue = "",
): Promise<T | undefined> => {
  const baseParameters = {
    page,
    size,
    text: searchValue,
  };

  const parameters =
    Object.keys(sorting).length > 0
      ? {
          ...baseParameters,
          sort: (sorting as SortingConfig).desc,
          column: convertToSnakeCase((sorting as SortingConfig).id),
        }
      : baseParameters;

  try {
    const { data } = await $authHost.get<T>(`reference-book/${link}/search`, { params: parameters });
    return data;
  } catch (error: unknown) {
    console.error("Error searching in directory:", error);
    return undefined;
  }
};
