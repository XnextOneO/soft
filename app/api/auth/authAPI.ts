import { $host } from "..";

// eslint-disable-next-line consistent-return
export const check = async (): Promise<unknown> => {
  try {
    const { status } = await $host.get("/user/check");
    if (status === 200) {
      return true;
    }
  } catch {
    try {
      const refreshTokenResult = await checkRefreshToken();
      return refreshTokenResult ? await check() : false;
    } catch {
      return false;
    }
  }
};

const checkRefreshToken = async (): Promise<boolean> => {
  try {
    const { status } = await $host.get("/auth/refresh-token");
    return status === 200;
  } catch {
    return false;
  }
};
