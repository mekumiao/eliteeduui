import ajax, { ApiBase, MsgOutput } from "./apiBase";
/**账号密码模型 */
export interface LoginInput {
  Account: string;
  PassWord: string;
}
/**Token输出模型 */
export interface TokenItem {
  Token: string;
}
/**手机号验证码输入模型 */
export interface PhoneCodeInput {
  Phone: string;
  Code: string;
}
/**名称手机号验证码输入模型 */
export interface NamePhoneCodeInput extends PhoneCodeInput {
  Name: string;
}
/**授权API */
class AdminAuthApi extends ApiBase {
  public readonly baseUrl: string = "/api/admin/Auth";
  /**
   * 获取Token
   * @param input 用户信息
   */
  public Token(input: LoginInput): Promise<TokenItem> {
    const url = this.mergeUrl("Token");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**检查当前状态是否登录 */
  public async CheckState(): Promise<boolean> {
    try {
      const url = this.mergeUrl("CheckState");
      await ajax.get<MsgOutput>(url);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * 访客登录或注册
   * @param input 手机号验证码模型
   */
  public LoginOrRegisterAtVisitorByPhoneCode(
    input: NamePhoneCodeInput
  ): Promise<TokenItem> {
    const url = this.mergeUrl("LoginOrRegisterAtVisitorByPhoneCode");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 发送访客注册或登录时用的验证码
   * @param phone 手机号
   */
  public SendVerificationCodeAtVisitor(phone: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("SendVerificationCodeAtVisitor", phone);
    return this.tryCatchCall(() => ajax.get(url));
  }
}

export const apiAuth = new AdminAuthApi();
