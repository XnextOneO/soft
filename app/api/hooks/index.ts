/* eslint-disable @typescript-eslint/no-explicit-any */
import { $authHost } from "../index";

// Define the FetchApiDataParameters interface with strict typing for each field
interface FetchApiDataParameters {
  link: string;
  page?: number;
  size?: number;
  sort?: string;
  column?: string;
  text?: string;
}

// Function to fetch data with parameters
export const fetchApiData = async (parameters: FetchApiDataParameters): Promise<any> => {
  try {
    const response = await $authHost.get(`reference-book/${parameters.link}`, {
      params: parameters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw new Error("Failed to fetch API data");
  }
};

// Function to fetch data with search text
export const fetchApiDataWithSearch = async (parameters: FetchApiDataParameters): Promise<any> => {
  try {
    const response = await $authHost.get(`reference-book/${parameters.link}/search`, {
      params: {
        text: parameters.text,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search API data:", error);
    throw new Error("Failed to fetch search API data");
  }
};
