import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import {
  ApiBase,
  InputError,
  isInputError,
  isMsgOutput,
  MsgOutput,
  ObjFilterInput,
  PageOutput,
  PublicWithKeyOutput,
  rootURL,
  timeout
} from "./apiBase";
import { getMessage } from "../utils/my-statusCode";

const ajax: AxiosInstance = axios.create({
  baseURL: rootURL,
  timeout: timeout
});
/**
 * 设置请求时带上授权Token
 */
ajax.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = window.localStorage.getItem("visitorToken");
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
    /**axios错误 */
    if (axios.isAxiosError(error)) {
      const res = error as AxiosError;

      /**api模型验证错误 */
      if (isInputError(res.response?.data)) {
        const data = res.response?.data as InputError;
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
      if (isMsgOutput(res.response?.data)) {
        const data = res.response?.data as MsgOutput;
        return Promise.reject(data);
      }
    }
    /**其他未受控制的错误 */
    const message = getMessage((error as Record<"response", unknown>).response);
    const errorMsgOutput: MsgOutput = {
      Title: message.msg,
      Code: message.code,
      MsgDetail: []
    };
    return Promise.reject<MsgOutput>(errorMsgOutput);
  }
);
/**课程输出模型 */
export interface CoursewareOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  SourcePath: string;
  ResourceType: number;
  ResourceTypeName: string;
  PreviewPhoto: string;
}
/**VIP课程访问Api */
class VipCoursewareApi extends ApiBase {
  /**基本路径 */
  public baseUrl = "/api/vip/Courseware";
  /**
   * 查询课程列表
   * @param input 查询模型
   * @returns 分页输出模型
   */
  public QueryPageCourseware(
    input: ObjFilterInput<CoursewareOutput>
  ): Promise<PageOutput<CoursewareOutput>> {
    const url = this.mergeUrl("QueryPageCourseware");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
}

export const apiVipCourseware = new VipCoursewareApi();
