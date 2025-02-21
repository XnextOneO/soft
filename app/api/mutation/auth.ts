import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { $host } from "@/app/api";

interface LoginParameters {
  username: string;
  password: string;
}

// Update the LoginResponse interface to match the backend response
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

const login = async ({ username, password }: LoginParameters): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await $host.post(
    "/authorization/login",
    { username, password },
    { withCredentials: true },
  );
  return response.data; // This will now return the updated structure
};

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginParameters> => {
  return useMutation<LoginResponse, Error, LoginParameters>({
    mutationFn: login,
  });
};
