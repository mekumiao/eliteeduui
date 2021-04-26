export interface TokenInfo {
  sub: string;
  role: string;
  name: string;
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
    const str = token.split(".")[1];
    const msg = window.atob(str);
    const info = JSON.parse(msg);
    return info as TokenInfo;
  }
  return undefined;
};
