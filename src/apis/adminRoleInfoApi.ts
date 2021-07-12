import { ApiBase } from "./apiBase";

export interface RoleInfoInput {
  RoleName: string;
  AnotherName: string;
  Describe: string;
  IsAdmin: boolean;
  PermissionInfoIds: string[];
}

export interface RoleInfoUpdInput {
  RoleName?: string;
  AnotherName?: string;
  Describe?: string;
  IsAdmin?: boolean;
  PermissionInfoIds?: string[];
}

export interface PermissionInfoOutput extends PublicWithKeyOutput {
  ApiName: string;
  ApiPath: string;
  ApiCode: string;
  ApiType: string;
}

export interface RoleInfoOutput extends PublicWithKeyOutput {
  RoleName: string;
  AnotherName: string;
  Describe: string;
  IsAdmin: boolean;
  PermissionInfos?: PermissionInfoOutput[];
}

/**管理员角色 */
class AdminRoleInfoApi extends ApiBase {
  public baseUrl = "/api/admin/RoleInfo";
  /**
   *创建
   * @param input 输入模型
   * @returns 主键模型
   */
  public Create(input: RoleInfoInput): Promise<PidKeyItem> {
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
    input: RoleInfoUpdInput
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
    input: ObjFilterInput<RoleInfoOutput>
  ): Promise<PageOutput<RoleInfoOutput>> {
    const url = this.mergeUrlParame("QueryPage");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 根据主键获取数据
   * @param id ID
   * @returns 结果
   */
  public Single(id: string): Promise<RoleInfoOutput> {
    const url = this.mergeUrlParame("Single", id);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
}

export const apiAdminRoleInfo = new AdminRoleInfoApi();
