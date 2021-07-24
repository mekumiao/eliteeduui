import { ApiBillBase } from "./apiBase";

export interface UserInfoInput {
  FullName: string;
  NickName: string;
  Gender: number;
  Portrait: string;
  Birthday?: Date;
  PassWord: string;
  RoleIds?: string[];
  Phone: string;
  Email: string;
  Identity?: string;
}

export interface UserInfoUpdInput {
  FullName?: string;
  NickName?: string;
  Gender?: number;
  Portrait?: string;
  Birthday?: Date;
  PassWord?: string;
  RoleIds?: string[];
  Phone?: string;
  Email?: string;
  Identity?: string;
}

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

/**用户信息接口 */
class UserInfoApi extends ApiBillBase<
  UserInfoInput,
  UserInfoUpdInput,
  UserInfoOutput
> {
  public readonly baseUrl = "/api/admin/UserInfo/";
  /**获取当前用户信息 */
  public GetCurrentUserInfo(): Promise<UserInfoOutput> {
    const url = this.mergeUrl("GetCurrentUserInfo");
    return this.tryCatchCall(() => this.ajax.get(url));
  }
}

export const apiAdminUserInfo = new UserInfoApi();
