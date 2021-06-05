import ajax, {
  ApiBase,
  MsgOutput,
  ObjFilterInput,
  PageOutput,
  PidKeyItem,
  PublicWithKeyOutput
} from "./apiBase";
/**系统配置输出模型 */
export interface SystemConfigOutput extends PublicWithKeyOutput {
  Group: string;
  Name: string;
  Value: string;
  Remark: string;
}
/**系统配置输入模型 */
export interface SystemConfigInput {
  Group: string;
  Name: string;
  Value: string;
  Remark: string;
}
/**系统配置修改模型 */
export interface SystemConfigUpdInput {
  Group?: string;
  Name?: string;
  Value?: string;
  Remark?: string;
}
/**系统配置API */
class SystemConfigApi extends ApiBase {
  /**根路径 */
  public baseUrl = "api/admin/SystemConfig";
  /**
   * 查询系统配置列表
   * @param input 查询条件
   * @returns 系统配置分页输出
   */
  public QueryPage(
    input: ObjFilterInput<SystemConfigOutput>
  ): Promise<PageOutput<SystemConfigOutput>> {
    const url = this.mergeUrl("QueryPage");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 创建系统配置
   * @param input 系统配置输入模型
   * @returns 主键信息
   */
  public Create(input: SystemConfigInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("Create");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 修改系统配置
   * @param input 系统配置输入模型
   * @returns 操作消息
   */
  public Update(
    id: string,
    timestamp: string,
    input: SystemConfigUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Update", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
  /**
   * 删除系统配置
   * @param id ID
   * @param timestamp 时间戳
   * @returns 操作消息
   */
  public Delete(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Delete", id, timestamp);
    return this.tryCatchCall(() => ajax.delete(url));
  }
}

export const apiSystemConfig = new SystemConfigApi();
