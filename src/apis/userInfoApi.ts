import ajax, {
  ApiBase,
  ObjFilterInput,
  PublicWithKeyOutput,
  PageOutput
} from "./apiBase";

/**访客用户输出实体 */
export interface VisitorUserInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Phone: string;
  Auth: boolean;
}
/**用户信息接口 */
class userInfo extends ApiBase {
  public baseUrl: string = "/api/admin/UserInfo/";
  /**查询访客用户信息 */
  public QueryPageVisitoryUserInfo(
    input: ObjFilterInput<VisitorUserInfoOutput>
  ): Promise<PageOutput<VisitorUserInfoOutput>> {
    const url = this.mergeUrl("QueryPageVisitoryUserInfo");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
}

export const apiUserInfo = new userInfo();
