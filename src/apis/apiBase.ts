import type { AxiosInstance } from "axios";
import { message } from "@/plugins/el-message";
import ajax from "@/utils/my-ajax";

/**基础API */
export abstract class ApiBase {
  /**基础路径 */
  public abstract readonly baseUrl: string;
  public readonly ajax: AxiosInstance = ajax;
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
   * @param isThrow 如果为true则继续抛出异常,否则返回undefined
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
        return Promise.resolve<T>(undefined as unknown as T);
      }
    }
  }
}
/**提供基础增删改业务逻辑的抽象类 */
export abstract class ApiBillBase<TInput, TUpdInput, TOutput> extends ApiBase {
  /**
   *创建
   * @param input 输入模型
   * @returns 主键模型
   */
  public Create(input: TInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("Create");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 修改
   * @param id ID
   * @param timestamp 时间按错
   * @param input 输入模型
   * @returns 消息码
   */
  public Update(
    id: string,
    timestamp: string,
    input: TUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Update", id, timestamp);
    return this.tryCatchCall(() => this.ajax.put(url, input));
  }
  /**
   * 删除
   * @param id ID
   * @param timestamp 时间戳
   * @returns 消息码
   */
  public Delete(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Delete", id, timestamp);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
  /**
   * 条件查询
   * @param input 输入模型
   * @returns 结果
   */
  public QueryPage(
    input: ObjFilterInput<TOutput>
  ): Promise<PageOutput<TOutput>> {
    const url = this.mergeUrlParame("QueryPage");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 根据主键获取数据
   * @param id ID
   * @returns 结果
   */
  public Single(id: string): Promise<TOutput> {
    const url = this.mergeUrlParame("Single", id);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
}

export default {};
