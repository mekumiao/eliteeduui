import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { message } from "@/plugins/el-message";
import { getMessage } from "@/apis/statuscode";

export let rootURL = "https://localhost:8080";
let timeout: number | undefined = undefined;

if (process.env.NODE_ENV === "production") {
  rootURL = "http://an.linshengweb.com:8188";
  timeout = 20000;
}

rootURL = "http://an.linshengweb.com:8188";

export interface MsgOutput {
  readonly code: number;
  readonly title: string;
  readonly msgdetail?: string[];
}

export interface InputError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, unknown>;
}

export interface OptionOutput {
  label: string;
  value: unknown;
  disabled?: boolean;
}

export class PageOutput<T = unknown> {
  public readonly total: number = 0;
  public readonly index: number = 0;
  public readonly size: number = 0;
  public readonly datalist: T[] = [];
}

export class PageInput<T extends unknown> {
  public index = 1;
  public size = 10;
  public sort?: SortInput<T>[];
}

export class OptionFilterInput {
  public tag: string;
  public match: string;
  public page: PageInput<OptionOutput>;

  public constructor(match?: string) {
    this.tag = "";
    this.match = match || "";
    this.page = { index: 1, size: 100 };
  }
}

export interface SortInput<T extends unknown> {
  orderby: keyof T;
  desc?: boolean;
}

export interface GroupInput<T extends unknown> {
  logic: "and" | "or";
  items?: ItemInput<T>[];
  groups?: GroupInput<T>[];
}

export interface ItemInput<T extends unknown> {
  field: keyof T;
  value: string;
  compare:
    | "equal"
    | "notequal"
    | "less"
    | "greater"
    | "lesseq"
    | "greatereq"
    | "startswith"
    | "endswith"
    | "contains"
    | "notcontains";
}

export interface KeyOutput {
  keyvalue: number;
}

export class ObjFilterInput<T extends unknown> {
  public condition?: GroupInput<T>;
  public page: PageInput<T>;

  public constructor(page: PageInput<T>) {
    this.page = page;
  }
}

export interface ViewEntity {
  pid: string;
  createuserid: number;
  updateuserid: number;
  createusername?: string;
  updateusername?: string;
  createtime?: Date;
  updatetime?: Date;
  timestamp: string;
}

/**检查是否是InputError类型 */
export const isInputError = (error: unknown): error is InputError => {
  if (!error) return false;
  if (typeof error === "object") {
    const res = error as Record<string, unknown>;
    if (res.type === undefined) return false;
    if (res.traceId === undefined) return false;
    if (res.status === undefined) return false;
    return true;
  }
  return false;
};

/**检查是否是MsgOutput类型 */
export const isMsgOutput = (output: unknown): output is MsgOutput => {
  if (!output) return false;
  if (typeof output === "object") {
    const res = output as Record<string, unknown>;
    if (res.code === undefined) return false;
    if (res.title === undefined) return false;
    return true;
  }
  return false;
};

/**
 * 设置请求根路径和超时时间
 */
const ajax: AxiosInstance = axios.create({
  baseURL: rootURL,
  timeout
});
/**
 * 设置请求时带上授权Token
 */
ajax.interceptors.request.use(
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
        const msgs = keys.map((x) => JSON.stringify(data.errors[x]));

        return Promise.reject({
          title: "输入错误",
          code: data.status,
          msgdetail: msgs
        });
      }

      /**api接口返回错误 */
      if (isMsgOutput(res.response?.data)) {
        const data = res.response?.data as MsgOutput;
        return Promise.reject(data);
      }
    }
    /**其他未受控制的错误 */
    const message = getMessage(error);
    return Promise.reject<MsgOutput>({
      code: message.code,
      title: message.msg
    });
  }
);

/**基础API */
export abstract class ApiBase {
  /**基础路径 */
  public abstract readonly baseUrl: string;
  private readonly regStart: RegExp = /^(\/)*/gi;
  private readonly regEnd: RegExp = /(\/)*$/gi;
  /**
   * 去掉开头的正斜杠
   * @param msg 操作字符串
   */
  private trimStart(msg: string): string {
    return msg.replace(this.regStart, "");
  }
  /**
   * 去掉结束的正斜杠
   * @param msg 操作字符串
   */
  private trimEnd(msg: string): string {
    return msg.replace(this.regEnd, "");
  }
  /**
   * 与baseUrl拼接为访问路径
   * @param url 待拼接路径
   */
  protected mergeUrl(url: string): string {
    return `${this.trimEnd(this.baseUrl)}/${this.trimStart(url)}`;
  }
  /**
   * 与baseUrl拼接并将params当作路由参数进行拼接
   * @param url 待拼接路径
   * @param params 待拼接的路由参数
   */
  protected mergeUrlParame(
    url: string,
    ...params: (string | number | boolean)[]
  ): string {
    const msgs = params.map((x) => x.toString());
    const array = msgs.map((x) => encodeURIComponent(x));
    const str = array.join("/");
    return `${this.trimEnd(this.mergeUrl(url))}/${this.trimStart(str)}`;
  }
  /**
   * 与baseUrl拼接并将query作为末尾参数进行拼接
   * @param url 待拼接路径
   * @param query 待拼接的末尾参数
   */
  protected mergeUrlQuery<T extends Record<string, string | number | boolean>>(
    url: string,
    query: T
  ): string {
    const keys = Object.keys(query);
    const array = keys.map<string>(
      (x) => `${x}=${encodeURIComponent(query[x])}`
    );
    const str = array.join("&");
    return `${this.trimEnd(this.mergeUrl(url))}?${this.trimStart(str)}`;
  }
  /**
   * 尝试执行异步方法
   * @param func 待执行异步方法
   * @param showError 发生错误时是否弹窗
   */
  protected async tryCatchCall<T>(
    func: () => Promise<T>,
    showError = true
  ): Promise<T> {
    try {
      return await func();
    } catch (error) {
      if (showError) {
        message.showError(error);
      }
      throw error;
    }
  }
}

/**单表基础Api */
export abstract class BillApiBase<
  TView extends Record<string, unknown>,
  TInput extends Record<string, unknown>,
  TUpdInput extends Record<string, unknown>
> extends ApiBase {
  /**
   * 条件查询
   * @param input 条件
   */
  public ObjQuery(input: ObjFilterInput<TView>): Promise<PageOutput<TView>> {
    const url = this.mergeUrl("ObjQuery");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 获取完整信息
   * @param id 主键
   */
  public Single(id: string): Promise<TView> {
    const url = this.mergeUrlParame("Single", id);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 删除项
   * @param id 主键
   * @param timestamp 时间戳
   */
  public Delete(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Delete", id, timestamp);
    return this.tryCatchCall(() => ajax.delete(url));
  }
  /**
   * 新增项
   * @param input 输入模型
   */
  public Create(input: TInput): Promise<KeyOutput> {
    const url = this.mergeUrl("Create");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 保存项
   * @param input 输入模型
   */
  public Update(
    id: string,
    timestamp: string,
    input: TUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Update", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
}

export default ajax;
