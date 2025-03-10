import axios, { InternalAxiosRequestConfig } from "axios";

export const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3_600_000,
  withCredentials: true,
});
export const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3_600_000,
  withCredentials: true,
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const storedData = localStorage.getItem("auth-storage");
  // eslint-disable-next-line unicorn/no-null
  const accessToken = storedData ? JSON.parse(storedData).state.accessToken : null;
  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
