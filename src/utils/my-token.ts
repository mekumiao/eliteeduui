export interface TokenInfo {
  sub: string;
  name: string;
  nickname: string;
  phone_number: string;
  email: string;
  gender: GenderEnum;
  birthdate: Date;
  picture: string;
  role: string;
  roleid: string;
  refexp: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
/**解析本地token */
export const getUserByToken = (): TokenInfo | undefined => {
  const token = localStorage.getItem("token");
  if (token) {
    debugger;
    const str = token.split(".")[1];
    const msg = window.atob(str);
    const info = JSON.parse(msg) as TokenInfo;
    info.birthdate = new Date(info.birthdate);
    info.gender = new Number(info.gender) as GenderEnum;
    info.nbf = new Number(info.nbf) as number;
    info.exp = new Number(info.exp) as number;
    return info as TokenInfo;
  }
  return undefined;
};
