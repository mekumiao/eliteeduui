/**
 * 数组去重
 * @param arr 数组
 */
export function noRepeat<T extends unknown>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * 查找数组最大值
 * @param arr 数组
 */
export function arrayMax(arr: number[]): number {
  return Math.max(...arr);
}

/**
 * 查找数组最小值
 * @param arr 数组
 */
export function arrayMin(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * 检查数组中某元素出现的次数
 * @param arr 数组
 * @param value 值
 */
export function countOccurrences<T extends unknown>(
  arr: T[],
  value: T
): number {
  return arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
}

/**
 * 返回两个数组中不同的元素
 * @param arr1 数组
 * @param arr2 数组
 */
export function diffrence<T extends unknown>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2).filter(function (v, _i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
}

/**
 * 返回两个数组中相同的元素
 * @param arr1 数组
 * @param arr2 数组
 */
export function intersection<T extends unknown>(arr1: T[], arr2: T[]): T[] {
  return arr2.filter((v) => arr1.includes(v));
}

/**
 * 从右删除 n 个元素
 * @param arr 数组
 * @param n 序号
 */
export function dropRight<T extends unknown>(arr: T[], n = 0): T[] {
  return n < arr.length ? arr.slice(0, arr.length - n) : [];
}

/**
 * 数组乱排
 * @param arr 数组
 */
export function shuffle<T extends unknown>(arr: T[]): T[] {
  const array = arr;
  let index = array.length;

  while (index) {
    index -= 1;
    const randomInedx = Math.floor(Math.random() * index);
    const middleware = array[index];
    array[index] = array[randomInedx];
    array[randomInedx] = middleware;
  }

  return array;
}

/**
 * 当前网页地址
 */
export function currentURL(): string {
  return window.location.href;
}

/**
 * 获取滚动条位置
 */
export function getScrollPosition(el = window): Record<"x" | "y", number> {
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollX,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollY
  };
}

/**
 * 页面跳转
 * @param url URL
 * @param asLink 是否记录在 history 中
 */
export function redirect(url: string, asLink = true): void {
  asLink ? (window.location.href = url) : window.location.replace(url);
}

/**
 * 复制文本
 * @param str 文本
 */
export function copy(str: string): void {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  el.style.top = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection()?.rangeCount || 0 > 0
      ? document.getSelection()?.getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(selected);
  }
}

/**
 * 检测设备类型
 */
export function detectDeviceType(): string {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
}

/**
 * 新增Cookie
 * @param key 键
 * @param value 值
 * @param expiredays 有效天数
 */
export function setCookie(
  key: string,
  value: string,
  expiredays: number
): void {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    key +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
}

/**
 * 删除Cookie
 * @param key 键
 */
export function delCookie(key: string): void {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(key);
  if (cval != null) {
    document.cookie = key + "=" + cval + ";expires=" + exp.toUTCString();
  }
}

/**
 * 获取Cookie
 * @param key 键
 */
export function getCookie(key: string): string | null {
  let arr;
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return arr[2];
  } else {
    return null;
  }
}

/**
 * 时间戳转换为时间
 * @param timestamp 默认为当前时间转换结果
 * @param isMs 时间戳是否为毫秒
 */
export function timestampToTime(
  timestamp = Date.parse(new Date().toString()),
  isMs = true
): Date {
  return new Date(timestamp * (isMs ? 1 : 1000));
}
