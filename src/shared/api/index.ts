import axios from "axios";

export const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3_600_000,
  withCredentials: true,
});
export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3_600_000,
  withCredentials: true,
});
$authHost.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
