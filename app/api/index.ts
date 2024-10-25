import { useRouter } from "next/navigation";
import axios from "axios";

import { check, checkRefreshToken } from "./auth/authAPI";

export const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1_800_000,
  withCredentials: true,
});
export const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1_800_000,
  withCredentials: true,
});

$authHost.interceptors.response.use(
  (response) => {
    console.log(response);
    // Если статус ответа не 401, возвращаем ответ как есть
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Обработка ошибки 401
      return check().then((result) => {
        // eslint-disable-next-line unicorn/prefer-ternary
        if (result) {
          return $authHost(error.response.config);
        } else {
          return checkRefreshToken().then((refreshTokenResult) => {
            if (refreshTokenResult) {
              return $authHost(error.response.config);
            } else {
              const router = useRouter();
              router.push("/login");
              throw new Error("Токены не валидны");
            }
          });
        }
      });
    } else {
      console.log("Ошибка:", error);
    }
    return Promise.reject(error);
  },
);
