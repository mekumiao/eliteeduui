import ajax, { ApiBase, MsgOutput } from "./apiBase";
import vipAjax from "./apiVipBase";
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
  Name?: string;
}
/**用户根据手机验证码修改密码模型 */
export interface PasswordWithPhoneCodeUpdInput {
  Code: string;
  PassWord: string;
}
/**用户账号密码修改时输入模型 */
export interface PasswordUpdInput {
  /**原密码 */
  OldPassWord: string;
  /**确认密码 */
  ConfirmPassWord: string;
  /**新密码 */
  PassWord: string;
}
/**授权API */
class AuthApi extends ApiBase {
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
   * VIP使用手机号和验证码登录或注册
   * @param input 手机号验证码模型
   */
  public VipLoginOrRegisterByPhoneCode(
    input: NamePhoneCodeInput
  ): Promise<TokenItem> {
    const url = this.mergeUrl("VipLoginOrRegisterByPhoneCode");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 发送VIP注册或登录时用的验证码
   * @param phone 手机号
   */
  public VipSendVerificationCode(phone: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("VipSendVerificationCode", phone);
    return this.tryCatchCall(() => ajax.get(url));
  }
  /**
   * VIP使用手机号和密码登录或注册
   * @param input 账号密码模型
   * @returns Token
   */
  public VipLoginOrRegisterByAccountCode(
    input: LoginInput
  ): Promise<TokenItem> {
    const url = this.mergeUrl("VipLoginOrRegisterByAccountCode");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 根据手机验证码重置密码
   * @param input 验证码模型
   * @returns 消息码
   */
  public VipResetPasswordByVerificationCode(
    input: PasswordWithPhoneCodeUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrl("VipResetPasswordByVerificationCode");
    return this.tryCatchCall(() => vipAjax.post(url, input));
  }
  /**
   * 发送根据手机号重置密码时用的验证码
   * @param phone 手机号
   * @returns 消息码
   */
  public SendVerificationCodeByResetPassword(
    phone: string
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame(
      "SendVerificationCodeByResetPassword",
      phone
    );
    return this.tryCatchCall(() => vipAjax.get(url));
  }
  /**
   * 根据原密码修改登录密码
   * @param input 修改密码时实体模型
   * @returns 消息码
   */
  public VipUpdatePasswordByOldPassword(
    input: PasswordUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrl("VipUpdatePasswordByOldPassword");
    return this.tryCatchCall(() => vipAjax.post(url, input));
  }
}

export const apiAuth = new AuthApi();
