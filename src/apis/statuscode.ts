const codemap: Record<number, string> = {
  400: "错误请求",
  401: "未授权，请重新登录！",
  403: "拒绝访问",
  404: "请求错误,未找到该资源！",
  405: "请求方法未允许",
  408: "请求超时",
  500: "服务器端出错",
  501: "网络未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "http版本不支持该请求"
};

export interface MessageResult {
  code: number;
  msg: string;
}

export const getMessage = (response: unknown): MessageResult => {
  debugger;
  if (typeof response === "object") {
    const res = response as Record<"status", number | undefined>;
    if (res && res.status) {
      return mapStatus(res.status);
    }
  }
  return mapStatus(undefined);
};

export const mapStatus = (status: number | undefined): MessageResult => {
  debugger;
  if (status === undefined) return { code: 500, msg: "连接到服务器失败" };
  const res = codemap[status];
  return res
    ? { code: status, msg: res }
    : { code: status, msg: `连接错误${status}` };
};

export default {};
