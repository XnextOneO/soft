import { useMutation } from "@tanstack/react-query";

import { $host } from "@/app/api";

interface LoginParameters {
  username: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async ({ username, password }: LoginParameters): Promise<any> => {
  return await $host.post(
    "/auth",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    },
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLogin = (): any => {
  return useMutation({
    mutationFn: login,
  });
};
