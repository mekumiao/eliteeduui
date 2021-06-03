/**
 * 获取 blob
 * @param url url 目标文件地址
 * @param cb 下载完的保存回调
 */
function getBlob(url: string, cb: (resp: any) => void) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(xhr.response);
    }
  };
  xhr.send();
}
/**
 * 保存
 * @param blob blob
 * @param filename 想要保存的文件名称
 */
function saveAs(blob: any, filename: string) {
  if (window.navigator.msSaveOrOpenBlob !== undefined) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    var body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    link.style.display = "none";
    body?.appendChild(link);

    link.click();
    body?.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}
/**
 * 下载
 * @param url 目标文件地址
 * @param filename 想要保存的文件名称
 */
export function download(url: string, filename: string) {
  getBlob(url, function (blob) {
    saveAs(blob, filename);
  });
}
