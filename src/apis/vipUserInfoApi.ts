import { VipUserInfoOutput } from "./adminUserInfoApi";
import { ApiBase } from "./apiBase";
import ajax from "./apiVipBase";

class UserInfoApi extends ApiBase {
  public baseUrl = "/api/vip/VipUserInfo/";
  /**
   * 获取当前VIP用户信息
   * @returns VIP用户信息
   */
  public GetCurrentVipUserInfo(): Promise<VipUserInfoOutput> {
    const url = this.mergeUrl("GetCurrentVipUserInfo");
    return this.tryCatchCall(() => ajax.get(url));
  }
}

export const apiVipUserInfo = new UserInfoApi();
