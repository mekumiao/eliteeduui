import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { message } from "@/plugins/el-message";
import { getMessage } from "@/apis/statuscode";

export let rootURL = "http://localhost:8080";
let timeout: number | undefined = undefined;

if (process.env.NODE_ENV === "production") {
  rootURL = "http://an.linshengweb.com:8188";
  timeout = 20000;
}

rootURL = "http://an.linshengweb.com:8188";

/**
 * 返回消息模型
 */
export interface MsgOutput extends Record<string, unknown> {
  readonly Code: number;
  readonly Title: string;
  readonly MsgDetail: string[];
}
/**
 * 参数格式错误输出模型
 */
export interface InputError extends Record<string, unknown> {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, unknown>;
}
/**
 * 选项输出模型
 */
export interface OptionOutput extends Record<string, unknown> {
  Label: string;
  Value: unknown;
  Disabled?: boolean;
}
/**
 * 分页输出模型
 */
export class PageOutput<T = unknown> {
  public Total = 0;
  public Index = 0;
  public Size = 0;
  public DataList: T[] = [];
}
/**
 * 分页输入模型
 */
export class PageInput<T extends unknown> {
  public Index = 1;
  public Size = 10;
  public Sorts?: SortInput<T>[];
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
    this.Page = { Index: 1, Size: 50 };
  }
}
/**
 * 排序模型
 */
export interface SortInput<T extends unknown> extends Record<string, unknown> {
  Orderby: keyof T;
  Desc?: boolean;
}
/**
 * 查询条件分组模型
 */
export interface GroupInput<T extends unknown> extends Record<string, unknown> {
  Logic: "and" | "or";
  Items?: ItemInput<T>[];
  Groups?: GroupInput<T>[];
}
/**
 * 查询条件项模型
 */
export interface ItemInput<T extends unknown> extends Record<string, unknown> {
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
 * 键模型
 */
export interface KeyItem<T extends unknown> extends Record<string, unknown> {
  KeyValue: T;
}
/**
 * Pid键模型
 */
export interface PidKeyItem extends KeyItem<string> {
  KeyValue: string;
}
/**
 * 对象形式的查询条件模型
 */
export class ObjFilterInput<T extends unknown> {
  public Condition?: GroupInput<T>;
  public Page: PageInput<T>;

  public constructor(page: PageInput<T>) {
    this.Page = page;
  }
}
/**
 * 公用视图模型
 */
export interface PublicView extends Record<string, unknown> {
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
    const message = getMessage(error);
    const errorMsgOutput: MsgOutput = {
      Title: message.msg,
      Code: message.code,
      MsgDetail: []
    };
    return Promise.reject<MsgOutput>(errorMsgOutput);
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
  public Create(input: TInput): Promise<PidKeyItem> {
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
