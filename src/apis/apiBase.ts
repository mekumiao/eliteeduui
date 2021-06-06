import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { message } from "@/plugins/el-message";
import { getMessage } from "@/utils/my-statusCode";

export let rootURL = "http://localhost:8080";
export let timeout: number | undefined = undefined;

if (process.env.NODE_ENV === "production") {
  rootURL = "http://an.linshengweb.com:8188";
  timeout = 20000;
}

//rootURL = "http://an.linshengweb.com:8188";

/**
 * 返回消息模型
 */
export interface MsgOutput {
  readonly Code: number;
  readonly Title: string;
  readonly MsgDetail: string[];
}
/**
 * 参数格式错误输出模型
 */
export interface InputError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, unknown>;
}
/**
 * 选项输出模型
 */
export interface OptionOutput {
  Label: string;
  Value: unknown;
  Disabled?: boolean;
}
/**
 * 分页输出模型
 */
export class PageOutput<T> {
  public Total = 0;
  public Index = 0;
  public Size = 0;
  public DataList: T[] = [];
}
/**
 * 分页输入模型
 */
export class PageInput<T> {
  public Index: number;
  public Size: number;
  public Sorts: SortInput<T>[];

  public constructor(index?: number, size?: number, sorts?: SortInput<T>[]) {
    this.Index = index ?? 1;
    this.Size = size ?? 10;
    this.Sorts = sorts ?? [];
  }
  /**
   * 尝试添加排序列
   * @param order 排序字段
   * @param desc 降序
   */
  public TryAddSort(order: keyof T, desc = false): void {
    if (!this.Sorts) {
      this.Sorts = [];
    }
    const array = this.Sorts.filter((x) => x.Orderby === order);
    if (array.length <= 0) {
      this.Sorts.push({ Orderby: order, Desc: desc });
    }
  }
  /**
   * 尝试修改排序列
   * @param order 排序字段
   * @param desc 降序
   */
  public TryUpdSort(order: keyof T, desc = false): void {
    if (!this.Sorts) {
      this.Sorts = [];
    }
    const array = this.Sorts.filter((x) => x.Orderby === order);
    if (array.length > 0) {
      array.forEach((item) => (item.Desc = desc));
    }
  }
}
/**
 * 选项查询模型
 */
export class OptionFilterInput {
  public Tag: string;
  public Match?: string;
  public Cascade?: string;
  public Page?: PageInput<OptionOutput>;

  public constructor(tag: string) {
    this.Tag = tag;
    this.Match = "";
    this.Cascade = "";
    this.Page = new PageInput(1, 50);
  }
}
/**
 * 排序模型
 */
export interface SortInput<T> {
  Orderby: keyof T;
  Desc?: boolean;
}
/**
 * 查询条件分组模型
 */
export interface GroupInput<T> {
  Logic: "and" | "or";
  Items?: ItemInput<T>[];
  Groups?: GroupInput<T>[];
}

/**
 * 查询条件项模型
 */
export interface ItemInput<T> {
  Field: keyof T;
  Value: string;
  Compare:
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
/**
 * 对象形式的查询条件模型
 */
export class ObjFilterInput<T> {
  public Condition?: GroupInput<T>;
  public Page: PageInput<T>;

  public constructor(page: PageInput<T>) {
    this.Page = page;
  }
}

///通用实体模型

/**下拉框选项 */
export interface OptionItem {
  Label: string;
  Value: string | number | boolean;
  Disabled: boolean;
}
/**级联下拉框选项 */
export interface CascaderOptionOutput extends OptionItem {
  Children: OptionItem[];
}
/**
 * 键模型
 */
export interface KeyItem<T> {
  KeyValue: T;
}
/**
 * Pid键模型
 */
export interface PidKeyItem extends KeyItem<string> {
  KeyValue: string;
}
/**
 * 公用视图模型
 */
export interface PublicView {
  /**创建人ID */
  createuserid?: string;
  /**修改人ID */
  updateuserid?: string;
  createusername?: string;
  updateusername?: string;
  createtime?: Date;
  updatetime?: Date;
  timestamp: string;
}
/**
 * 有键视图模型
 */
export interface ViewEntity extends PublicView {
  /**唯一标识 */
  pid: string;
}
/**
 * 公开实体模型
 */
export interface PublicOutput {
  CreateUserId?: string;
  UpdateUserId?: string;
  CreateUserName?: string;
  UpdateUserName?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
  Timestamp: string;
}
/**
 * 有键的公开实体模型
 */
export interface PublicWithKeyOutput extends PublicOutput {
  Pid: string;
}
/**有键实体模型 */
export interface WithKeyOutput {
  Pid: string;
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
    if (res.Code === undefined) return false;
    if (res.Title === undefined) return false;
    if (res.MsgDetail === undefined) return false;
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
 * 处理axios错误响应
 */
export function ResponseErrorHandle(error: unknown): Promise<MsgOutput> {
  /**axios错误 */
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    /**api模型验证错误 */
    if (isInputError(axiosError.response?.data)) {
      const data = axiosError.response?.data as InputError;
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
    if (isMsgOutput(axiosError.response?.data)) {
      const data = axiosError.response?.data as MsgOutput;
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
 * 对axios响应进行统一处理
 */
ajax.interceptors.response.use(
  (result: AxiosResponse): AxiosResponse => {
    return result.data;
  },
  (error: unknown): Promise<MsgOutput> => {
    return ResponseErrorHandle(error);
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
    const msgs = params.map((x) => (x || "").toString());
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
   * 尝试执行异步方法并通知错误信息
   * @param func 待执行异步方法
   * @param isThrow 是否继续抛出异常
   */
  protected async tryCatchCall<T>(
    func: () => Promise<T>,
    isThrow = true
  ): Promise<T> {
    try {
      return await func();
    } catch (error) {
      if (isThrow) {
        message.showError(error);
        throw error;
      } else {
        return Promise.resolve<T>({} as T);
      }
    }
  }
}

export default ajax;
