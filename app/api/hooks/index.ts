import { useQuery } from "@tanstack/react-query";

import { $host } from "../index";

interface FetchApiDataParameters {
  page?: number;
  size?: number;
  sort?: string;
  column?: string;
}

export const useApiData = (
  parameters: FetchApiDataParameters,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { data: any; error: any; isLoading: boolean } => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["apiData", parameters],
    queryFn: async () => {
      const response = await $host.get("reference-book/nsi/currency", {
        params: parameters,
      });
      return response.data;
    },
  });

  return { data, error, isLoading };
};
