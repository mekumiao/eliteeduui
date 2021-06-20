import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { getMessage, mapStatus } from "@/utils/my-statusCode";
import { InputError, MsgOutput } from "./publicEntity";

export let rootURL = "http://localhost:8080";
export let timeout: number | undefined = undefined;

if (process.env.NODE_ENV === "production") {
  rootURL = "http://an.linshengweb.com:8188";
  timeout = 20000;
}

//rootURL = "http://an.linshengweb.com:8188";
//rootURL = "http://localhost:8080";

/**检查是否是InputError类型 */
function isInputError(error: unknown): error is InputError {
  if (!error) return false;
  if (typeof error === "object") {
    const res = error as Record<string, unknown>;
    if (res.type === undefined) return false;
    if (res.traceId === undefined) return false;
    if (res.status === undefined) return false;
    return true;
  }
  return false;
}
/**检查是否是MsgOutput类型 */
function isMsgOutput(output: unknown): output is MsgOutput {
  if (!output) return false;
  if (typeof output === "object") {
    const res = output as Record<string, unknown>;
    if (res.Code === undefined) return false;
    if (res.Title === undefined) return false;
    if (res.MsgDetail === undefined) return false;
    return true;
  }
  return false;
}

/**
 * 处理axios错误响应
 */
function ResponseErrorHandle(error: unknown): Promise<MsgOutput> {
  /**axios错误 */
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data;
    /**api模型验证错误 */
    if (data && isInputError(data)) {
      const keys = Object.keys(data.errors);
      const arrayMsg = keys.map((x) => JSON.stringify(data.errors[x]));
      const msgOutput: MsgOutput = {
        Title: "输入错误",
        Code: data.status,
        MsgDetail: arrayMsg
      };
      return Promise.reject(msgOutput);
    }

    /**api接口返回错误 */
    if (data && isMsgOutput(data)) {
      data.Title = mapStatus(axiosError.response?.status).msg;
      return Promise.reject(data);
    }

    /**其他未受控制的Axios错误 */
    const resp = (error as Record<"response", unknown>).response;
    const msgResult = getMessage(resp);
    const errorMsgOutput: MsgOutput = {
      Title: msgResult.msg,
      Code: msgResult.code,
      MsgDetail: []
    };
    const detail = (resp as Record<"data", string>)?.data;
    if (detail) {
      errorMsgOutput.MsgDetail.push(detail);
    }
    return Promise.reject<MsgOutput>(errorMsgOutput);
  } else {
    return Promise.reject<MsgOutput>(error);
  }
}
/**
 * 设置请求时带上授权Token
 * @param instance axios实例
 */
export function handleRequest(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error: unknown): Promise<unknown> => {
      return Promise.reject(error);
    }
  );
}
/**
 * 对返回结果进行统一处理
 * @param instance axios实例
 */
export function handleResponse(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (result: AxiosResponse): AxiosResponse => {
      return result.data;
    },
    (error: unknown): Promise<MsgOutput> => {
      return ResponseErrorHandle(error);
    }
  );
}
/**
 * 创建axios实例
 */
export function createAjax(): AxiosInstance {
  const ajax: AxiosInstance = axios.create({
    baseURL: rootURL,
    timeout: timeout
  });
  handleRequest(ajax);
  handleResponse(ajax);
  return ajax;
}

export default createAjax();
