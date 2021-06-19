import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MsgOutput, ResponseErrorHandle, rootURL, timeout } from "./apiBase";

const ajax: AxiosInstance = axios.create({
  baseURL: rootURL,
  timeout: timeout
});
/**
 * 设置请求时带上授权Token
 */
ajax.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = window.localStorage.getItem("vipToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown): Promise<unknown> => {
    return Promise.reject(error);
  }
);
/**
 * 对返回结果进行统一处理
 */
ajax.interceptors.response.use(
  (result: AxiosResponse): AxiosResponse => {
    return result.data;
  },
  (error: unknown): Promise<MsgOutput> => {
    return ResponseErrorHandle(error);
  }
);

export default ajax;
