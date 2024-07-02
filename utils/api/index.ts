import axios, {InternalAxiosRequestConfig} from "axios";

// export const $host = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || ''
// })
export const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://wca-s647057:8080/'
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)