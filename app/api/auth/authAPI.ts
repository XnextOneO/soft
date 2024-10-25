import { $host } from "..";

// eslint-disable-next-line consistent-return
export const check = async (retryCount = 0): Promise<unknown> => {
  try {
    const { status } = await $host.get("/user/check");
    if (status === 200) {
      return true;
    }
  } catch {
    if (retryCount >= 3) {
      return false;
    }
    try {
      const refreshTokenResult = await checkRefreshToken();
      return refreshTokenResult ? await check(retryCount + 1) : false;
    } catch {
      return false;
    }
  }
};

export const checkRefreshToken = async (): Promise<boolean> => {
  try {
    const { status } = await $host.get("/auth/refresh-token");
    return status === 200;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await $host.get("/auth/logout");
};
