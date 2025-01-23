import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { $authHost } from "@/app/api";
import { check, checkRefreshToken } from "@/app/api/auth/authAPI";

const useAuthInterceptor = (): void => {
  const router = useRouter();

  useEffect(() => {
    const interceptor = $authHost.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          const result = await check();
          if (result) {
            return $authHost(error.response.config);
          } else {
            const refreshTokenResult = await checkRefreshToken();
            if (refreshTokenResult) {
              return $authHost(error.response.config);
            } else {
              router.push("/login");
              throw new Error("Токены не валидны");
            }
          }
        } else {
          console.log("Ошибка:", error);
        }
        throw error;
      },
    );

    return (): void => {
      $authHost.interceptors.response.eject(interceptor);
    };
  }, [router]);
};

export default useAuthInterceptor;
