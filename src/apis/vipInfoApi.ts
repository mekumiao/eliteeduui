import { UserInfoOutput } from "./adminUserInfoApi";
import { ApiBase } from "./base/apiBase";
import {
  MsgOutput,
  ObjFilterInput,
  PageOutput,
  PidKeyItem,
  PublicWithKeyOutput
} from "./base/publicEntity";

/**VIP输出实体 */
export interface VipInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Phone: string;
  PassWord: string;
  Auth: boolean;
}
/**VIP创建模型 */
export interface VipInfoInput {
  Name: string;
  Phone: string;
  PassWord: string;
}
/**VIP修改模型 */
export interface VipInfoUpdInput {
  Name?: string;
  Phone?: string;
  PassWord?: string;
}

class VipInfo extends ApiBase {
  public baseUrl = "/api/edu/VipInfo/";
  /**
   * 查询VIP信息
   * @param input 条件模型
   */
  public QueryPageVipInfo(
    input: ObjFilterInput<UserInfoOutput>
  ): Promise<PageOutput<VipInfoOutput>> {
    const url = this.mergeUrl("QueryPageVipInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 创建VIP
   * @param input VIP输入模型
   */
  public CreateVipInfo(input: VipInfoInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateVipInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 修改VIP
   * @param id ID
   * @param timestamp 时间戳
   * @param input 输入模型
   */
  public UpdateVipInfo(
    id: string,
    timestamp: string,
    input: VipInfoUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateVipInfo", id, timestamp);
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
  public DeleteVipInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteVipInfoById", id);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
}

export const apiVipInfo = new VipInfo();
