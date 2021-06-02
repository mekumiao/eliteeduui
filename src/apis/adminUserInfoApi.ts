import ajax, {
  ApiBase,
  ObjFilterInput,
  PublicWithKeyOutput,
  PageOutput,
  MsgOutput
} from "./apiBase";

/**访客用户输出实体 */
export interface VisitorUserInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Phone: string;
  Auth: boolean;
}
/**用户信息接口 */
class AdminUserInfoApi extends ApiBase {
  public baseUrl = "/api/admin/UserInfo/";
  /**
   * 查询访客用户信息
   * @param input 条件模型
   */
  public QueryPageVisitoryUserInfo(
    input: ObjFilterInput<VisitorUserInfoOutput>
  ): Promise<PageOutput<VisitorUserInfoOutput>> {
    const url = this.mergeUrl("QueryPageVisitoryUserInfo");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 审核访客用户
   * @param id 访客用户ID
   */
  public AuthVisitoryUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("AuthVisitoryUserInfoById", id);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 取消审核访客用户
   * @param id 访客用户ID
   */
  public UnAuthVisitoryUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UnAuthVisitoryUserInfoById", id);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * 删除访客用户
   * @param id 访客用户ID
   */
  public DeleteVisitoryUserInfoById(id: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteVisitoryUserInfoById", id);
    return this.tryCatchCall(() => ajax.delete(url));
  }
}

export const apiUserInfo = new AdminUserInfoApi();
