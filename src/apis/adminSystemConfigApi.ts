import { ApiBillBase } from "./apiBase";

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
class SystemConfigApi extends ApiBillBase<
  SystemConfigInput,
  SystemConfigUpdInput,
  SystemConfigOutput
> {
  public baseUrl = "api/admin/SystemConfig";
  /**
   * 根据键获取配置
   * @param name 配置名称
   * @returns 配置信息
   */
  public GetSystemConfigByName(
    name: string
  ): Promise<ValueItem<SystemConfigOutput>> {
    const url = this.mergeUrlParame("GetSystemConfigByName", name);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
  /**
   * 根据键获取配置(再store中调用,不需要显示错误)
   * @param name 配置名称
   * @returns 配置信息
   */
  public GetSystemConfigByNameNoThrow(
    name: string
  ): Promise<ValueItem<SystemConfigOutput>> {
    const url = this.mergeUrlParame("GetSystemConfigByName", name);
    return this.tryCatchCall(() => this.ajax.get(url), false);
  }
}

export const apiAdminSystemConfig = new SystemConfigApi();
