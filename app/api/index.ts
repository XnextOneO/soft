import axios from "axios";

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
