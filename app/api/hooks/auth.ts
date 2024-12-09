import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { $host } from "@/app/api";

interface LoginParameters {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: number;
  username: string;
}

// Login function: Handles the API call for user login
const login = async ({ username, password }: LoginParameters): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await $host.post(
      "/auth",
      { username, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    // Log and rethrow the error for react-query to handle
    console.error("Login failed:", error);
    throw new Error("Failed to log in. Please try again.");
  }
};

// useLogin hook: Provides a mutation for the login function
export const useLogin = (): UseMutationResult<
  LoginResponse, // Success type
  Error, // Error type
  LoginParameters // Variables type
> => {
  return useMutation<LoginResponse, Error, LoginParameters>({
    mutationFn: login,
  });
};
