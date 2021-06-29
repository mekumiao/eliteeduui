import jwt_decode from "jwt-decode";

export interface TokenInfo {
  sub: string;
  name: string;
  nickname: string;
  phone_number: string;
  email: string;
  gender: GenderEnum;
  birthdate: Date;
  picture: string;
  role: string[];
  roleid: string[];
  refexp: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * token解析为TokenInfo
 * @param token token
 */
export function decodeAccessToken(token: string): TokenInfo | undefined {
  try {
    const decoded = jwt_decode<TokenInfo>(token);
    if (decoded) {
      decoded.birthdate = new Date(decoded.birthdate);
      decoded.gender = parseInt(decoded.gender as unknown as string);
      decoded.nbf = parseInt(decoded.nbf as unknown as string);
      decoded.exp = parseInt(decoded.exp as unknown as string);
      if (typeof decoded.role === "string") {
        decoded.role = [decoded.role as unknown as string];
      }
      if (typeof decoded.roleid === "string") {
        decoded.roleid = [decoded.roleid as unknown as string];
      }
      return decoded;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}
/**
 * 检查tokenInfo是否过期
 * @param info TokenInfo
 */
export function IsExpire(info?: TokenInfo): boolean {
  if (info) {
    return Math.round(Date.now() / 1000) > info.exp;
  }
  return true;
}

export default {};
