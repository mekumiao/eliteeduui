import { ApiBillBase } from "./apiBase";

export interface RoleInfoInput {
  RoleName: string;
  AnotherName: string;
  Describe: string;
  IsAdmin: boolean;
  PermissionInfoIds: string[];
}

export interface RoleInfoUpdInput {
  RoleName?: string;
  AnotherName?: string;
  Describe?: string;
  IsAdmin?: boolean;
  PermissionInfoIds?: string[];
}

export interface PermissionInfoOutput extends PublicWithKeyOutput {
  ApiName: string;
  ApiPath: string;
  ApiCode: string;
  ApiType: string;
}

export interface RoleInfoOutput extends PublicWithKeyOutput {
  RoleName: string;
  AnotherName: string;
  Describe: string;
  IsAdmin: boolean;
  PermissionInfos?: PermissionInfoOutput[];
}

/**角色管理 */
class AdminRoleInfoApi extends ApiBillBase<
  RoleInfoInput,
  RoleInfoUpdInput,
  RoleInfoOutput
> {
  public readonly baseUrl = "/api/admin/RoleInfo";
}

export const apiAdminRoleInfo = new AdminRoleInfoApi();
