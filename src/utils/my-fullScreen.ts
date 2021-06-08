//全屏
export function fullScreen(): void {
  debugger;
  const el = document.documentElement;
  const rfs =
    el.requestFullscreen ||
    ((el as unknown) as Record<string, unknown>).webkitRequestFullscreen ||
    ((el as unknown) as Record<string, unknown>).mozRequestFullscreen ||
    ((el as unknown) as Record<string, unknown>).msRequestFullscreen;
  if (rfs && typeof rfs === "function") {
    rfs({ navigationUI: "auto" });
  }
  return;
}
//退出全屏
export function exitScreen(): void {
  debugger;
  const el = document.documentElement;
  const rfs =
    el.requestFullscreen ||
    ((el as unknown) as Record<string, unknown>).webkitRequestFullscreen ||
    ((el as unknown) as Record<string, unknown>).mozRequestFullscreen ||
    ((el as unknown) as Record<string, unknown>).msRequestFullscreen;
  if (rfs && typeof rfs === "function") {
    rfs.call(el);
  }
}
//ie低版本的全屏，退出全屏都这个方法
export function iefull(): void {
  debugger;
  if (window.ActiveXObject && typeof window.ActiveXObject === "function") {
    //这的方法 模拟f11键，使浏览器全屏
    const wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}

export default { fullScreen, exitScreen, iefull };
