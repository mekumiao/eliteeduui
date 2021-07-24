import { UserInfoOutput } from "./adminUserInfoApi";
import { ApiBase } from "./apiBase";

/**VIP输出实体 */
export interface VipInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Phone: string;
  Auth: boolean;
}
/**VIP创建模型 */
export interface VipInfoInput {
  Name: string;
  Phone: string;
}
/**VIP修改模型 */
export interface VipInfoUpdInput {
  Name?: string;
  Phone?: string;
}

class VipInfo extends ApiBase {
  public readonly baseUrl = "/api/edu/VipInfo/";
  /**
   * 查询VIP信息
   * @param input 条件模型
   */
  public QueryPage(
    input: ObjFilterInput<UserInfoOutput>
  ): Promise<PageOutput<VipInfoOutput>> {
    const url = this.mergeUrl("QueryPage");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 创建VIP
   * @param input VIP输入模型
   */
  public Create(input: VipInfoInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("Create");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 修改VIP
   * @param id ID
   * @param timestamp 时间戳
   * @param input 输入模型
   */
  public Update(
    id: string,
    timestamp: string,
    input: VipInfoUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Update", id, timestamp);
    return this.tryCatchCall(() => this.ajax.put(url, input));
  }
  /**
   * 审核VIP
   * @param id ID
   */
  public AuthVipInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("AuthVipInfoById", id);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
  /**
   * 取消审核VIP
   * @param id ID
   */
  public UnAuthVipInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UnAuthVipInfoById", id);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
  /**
   * 删除VIP
   * @param id ID
   */
  public Delete(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("Delete", id);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
}

export const apiVipInfo = new VipInfo();
