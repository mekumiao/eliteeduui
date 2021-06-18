import ajax, {
  ApiBase,
  ObjFilterInput,
  PublicWithKeyOutput,
  PageOutput,
  MsgOutput,
  PidKeyItem
} from "./apiBase";

export interface RoleItem {
  RoleId: string;
  RoleName: string;
}

export interface UserInfoOutput extends PublicWithKeyOutput {
  FullName: string;
  NickName: string;
  Gender: number;
  Age: number;
  Portrait: string;
  Birthday: Date;
  Phone: string;
  Email: string;
  Identity: string;
  Account: string;
  Roles: RoleItem[];
}

/**VIP用户输出实体 */
export interface VipUserInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Phone: string;
  PassWord: string;
  Auth: boolean;
}
/**VIP用户创建模型 */
export interface VipUserInfoInput {
  Name: string;
  Phone: string;
  PassWord: string;
}
/**VIP用户修改模型 */
export interface VipUserInfoUpdInput {
  Name?: string;
  Phone?: string;
  PassWord?: string;
}
/**用户信息接口 */
class UserInfoApi extends ApiBase {
  public baseUrl = "/api/admin/UserInfo/";
  /**获取当前用户信息 */
  public GetCurrentUserInfo(): Promise<UserInfoOutput> {
    const url = this.mergeUrl("GetCurrentUserInfo");
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 查询VIP用户信息
   * @param input 条件模型
   */
  public QueryPageVipUserInfo(
    input: ObjFilterInput<VipUserInfoOutput>
  ): Promise<PageOutput<VipUserInfoOutput>> {
    const url = this.mergeUrl("QueryPageVipUserInfo");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 创建VIP用户
   * @param input VIP用户输入模型
   */
  public CreateVipUserInfo(input: VipUserInfoInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateVipUserInfo");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 修改VIP用户
   * @param id ID
   * @param timestamp 时间戳
   * @param input 输入模型
   */
  public UpdateVipUserInfo(
    id: string,
    timestamp: string,
    input: VipUserInfoUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateVipUserInfo", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
  /**
   * 审核VIP用户
   * @param id VIP用户ID
   */
  public AuthVipUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("AuthVipUserInfoById", id);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 取消审核VIP用户
   * @param id VIP用户ID
   */
  public UnAuthVipUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UnAuthVipUserInfoById", id);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 删除VIP用户
   * @param id VIP用户ID
   */
  public DeleteVipUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteVipUserInfoById", id);
    return this.tryCatchCall(() => ajax.delete(url));
  }
}

export const apiUserInfo = new UserInfoApi();
