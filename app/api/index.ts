import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { check, checkRefreshToken } from "./auth/authAPI";

const BASE_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3_600_000,
  withCredentials: true,
};

/**
 * Creates an axios instance with optional authentication setup
 * @param isAuth - Determines if the instance requires authentication interceptor
 * @returns Configured axios instance
 */
function createAxiosInstance(isAuth: boolean = false): AxiosInstance {
  const instance = axios.create(BASE_CONFIG);

  if (isAuth) {
    setupAuthInterceptor(instance);
  }

  return instance;
}

/**
 * Sets up authentication interceptor for handling token refresh and errors
 * Manages 401 unauthorized scenarios with token refresh logic
 * @param instance - Axios instance to configure with authentication interceptor
 */
function setupAuthInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      // Handle unauthorized access (401 status)
      if (error.response?.status === 401) {
        try {
          // First attempt: validate current token
          const isCheckValid = await check();
          if (isCheckValid) {
            return instance(originalRequest);
          }

          // Second attempt: refresh token
          const isRefreshValid = await checkRefreshToken();
          if (isRefreshValid) {
            return instance(originalRequest);
          }

          // If all token restoration attempts fail - redirect to login
          const router = useRouter();
          router.push("/login");

          throw new Error("Authentication failed: tokens are invalid");
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);
          throw refreshError;
        }
      }

      console.error("Request error:", error);
      throw error;
    },
  );
}

// Create axios instances with different configurations
export const $host = createAxiosInstance();
export const $authHost = createAxiosInstance(true);
