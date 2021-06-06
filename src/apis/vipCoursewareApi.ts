import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ApiBase,
  MsgOutput,
  ObjFilterInput,
  PageOutput,
  PublicWithKeyOutput,
  ResponseErrorHandle,
  rootURL,
  timeout
} from "./apiBase";

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
/**课件输出模型 */
export interface CoursewareOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  SourcePath: string;
  ResourceType: number;
  ResourceTypeName: string;
  PreviewPhoto: string;
}
/**VIP课件访问Api */
class CoursewareApi extends ApiBase {
  /**基本路径 */
  public baseUrl = "/api/vip/Courseware";
  /**
   * 查询课件列表
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

export const apiVipCourseware = new CoursewareApi();
