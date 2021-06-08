/**获取进入全屏方法 */
function getFullScreen(): (() => Promise<void>) | undefined {
  const el = document.documentElement;
  const rfs =
    el.requestFullscreen ||
    (el as unknown as Record<string, unknown>).webkitRequestFullscreen ||
    (el as unknown as Record<string, unknown>).mozRequestFullscreen ||
    (el as unknown as Record<string, unknown>).msRequestFullscreen;
  if (rfs && typeof rfs === "function") {
    return rfs;
  }
  return undefined;
}
/**获取退出全屏方法 */
function getExitScreen(): (() => Promise<void>) | undefined {
  const rfs =
    document.exitFullscreen ||
    (document as unknown as Record<string, unknown>).webkitExitFullscreen ||
    (document as unknown as Record<string, unknown>).mozExitFullscreen ||
    (document as unknown as Record<string, unknown>).msExitFullscreen;
  if (rfs && typeof rfs === "function") {
    return rfs;
  }
  return undefined;
}
/**全屏或退出全屏(ie低版本) */
function ieFull(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.ActiveXObject && typeof window.ActiveXObject === "function") {
      //模拟f11键，使浏览器全屏
      const wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
        resolve();
      }
    }
    reject();
  });
}
/**
 * 判断当前是否全屏显示
 * @returns 当前是否全屏显示
 */
function isFullScreen(): boolean {
  const doc = document as unknown as Record<string, unknown>;
  const isFullscreen =
    document.fullscreenElement ||
    doc.fullScreen ||
    doc.mozFullScreen ||
    doc.webkitIsFullScreen;
  return !!isFullscreen;
}
/**
 * 实现全屏显示统一方法
 * @returns 当前是否全屏显示
 */
async function fullScreen(): Promise<boolean> {
  if (!isFullScreen()) {
    const full = getFullScreen();
    if (full) {
      await full.call(document.documentElement);
    } else {
      await ieFull();
    }
    return true;
  } else {
    const exit = getExitScreen();
    if (exit) {
      await exit.call(document);
    } else {
      await ieFull();
    }
    return false;
  }
}

export default fullScreen;
