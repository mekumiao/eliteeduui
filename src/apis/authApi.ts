import ajax, { ApiBase, MsgOutput } from "./apiBase";

export interface LoginInput {
  Account: string;
  PassWord: string;
}
export interface TokenOutput {
  Token: string;
}

class Auth extends ApiBase {
  public readonly baseUrl: string = "/api/admin/Auth";
  /**
   * 获取Token
   * @param input 用户信息
   */
  public Token(input: LoginInput): Promise<TokenOutput> {
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
}

export const apiAuth = new Auth();
