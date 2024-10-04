import axios from "axios";
export const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1_800_000,
  withCredentials: true,
});
// export const $authHost = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   timeout: 1_800_000,
// });

// const authInterceptor = (
//   config: InternalAxiosRequestConfig,
// ): InternalAxiosRequestConfig => {
//   config. = `${cookies().get("Access")}`;
//   return config;
// };

// $authHost.interceptors.request.use(authInterceptor);
