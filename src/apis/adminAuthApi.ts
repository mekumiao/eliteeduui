import { ApiBase } from "./base/apiBase";
import { MsgOutput } from "./base/publicEntity";

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
/**重置用户密码(手机验证码) */
export interface ResetPasswordByPhoneCodeInput {
  Phone: string;
  Code: string;
  PassWord: string;
}
/**用户账号密码修改时输入模型 */
export interface PasswordUpdInput {
  /**账号 */
  Account: string;
  /**原密码 */
  OldPassWord: string;
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
  public GetToken(input: LoginInput): Promise<TokenItem> {
    const url = this.mergeUrl("GetToken");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 刷新Token(以旧换新)
   * @param input token信息
   */
  public RefreshToken(input: TokenItem): Promise<TokenItem> {
    const url = this.mergeUrl("RefreshToken");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**检查当前状态是否登录 */
  public async CheckCurrentAdminUserState(): Promise<boolean> {
    try {
      const url = this.mergeUrl("CheckCurrentAdminUserState");
      await this.ajax.get<MsgOutput>(url);
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
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**
   * 发送注册或登录时用的验证码
   * @param phone 手机号
   */
  public SendVerificationCode(phone: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("SendVerificationCode", phone);
    return this.tryCatchCall(() => this.ajax.get(url));
  }
  /**
   * 根据手机验证码重置登录密码
   * @param input 验证码模型
   * @returns 消息码
   */
  public UserResetPasswordByVerificationCode(
    input: ResetPasswordByPhoneCodeInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrl("UserResetPasswordByVerificationCode");
    return this.tryCatchCall(() => this.ajax.post(url, input));
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
    return this.tryCatchCall(() => this.ajax.get(url));
  }
  /**
   * 用户根据原密码修改登录密码
   * @param input 修改密码时实体模型
   * @returns 消息码
   */
  public UserUpdatePasswordByOldPassword(
    input: PasswordUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrl("UserUpdatePasswordByOldPassword");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiAuth = new AuthApi();
