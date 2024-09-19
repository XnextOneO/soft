import axios, { InternalAxiosRequestConfig } from "axios";

export const $host = axios.create({
<<<<<<< HEAD
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1800000
=======
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1_800_000,
>>>>>>> 2d93cc64e027ec9e924fbf635d1c6c356f347724
});
// export const $authHost = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || ''
// })

// const authInterceptor = (config: InternalAxiosRequestConfig) => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }

// $authHost.interceptors.request.use(authInterceptor)
