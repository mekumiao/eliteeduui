import {
  IMessage,
  IMessageHandle
} from "element-plus/lib/el-message/src/types";
import { App, h } from "vue";
import { Plugin, VNode } from "@vue/runtime-core/dist/runtime-core";
import { ElMessage } from "element-plus";
import { MsgOutput } from "@/apis/base/publicEntity";

type MsgInfo = MsgOutput | string | string[] | number | unknown;

export interface ShowMessage {
  showSuccess: (msg: MsgInfo) => IMessageHandle;
  showError: (msg: MsgInfo) => IMessageHandle;
  showInfo: (msg: MsgInfo) => IMessageHandle;
  showMsgOutput: (msg: MsgOutput) => IMessageHandle;
  closeAll: () => void;
}

const handMsgInfo = (msg: MsgInfo): VNode | string => {
  const info: MsgOutput = msg as MsgOutput;
  if (info.Title !== undefined && info.Code !== undefined) {
    if (info.MsgDetail) {
      const array = info.MsgDetail.map((item) => h("pre", null, item));
      if (info.Title) {
        array.unshift(h("h4", null, info.Title));
      }
      return h("p", { class: "el-message__content" }, array);
    } else {
      return info.Title;
    }
  } else if (typeof msg === "object") {
    const strs: string[] = msg as string[];
    const array = strs.map((item) => h("p", null, item));
    return h("p", { class: "el-message__content" }, array);
  } else if (typeof msg === "string") {
    return msg;
  } else if (typeof msg === "number") {
    return msg.toString();
  } else {
    return `${msg}`;
  }
};

class ElMessageProvider implements ShowMessage {
  public constructor(private instance: IMessage) {
    this.instance = instance;
  }

  public showSuccess(msg: MsgInfo): IMessageHandle {
    return this.instance.success({
      type: "success",
      message: handMsgInfo(msg),
      showClose: false,
      center: true,
      duration: 2000,
      offset: 10,
      customClass: "message_cust_success"
    });
  }

  public showError(msg: MsgInfo): IMessageHandle {
    return this.instance.error({
      type: "error",
      message: handMsgInfo(msg),
      showClose: true,
      center: true,
      duration: 4000,
      offset: 10,
      customClass: "message_cust_error"
    });
  }

  public showMsgOutput(msg: MsgOutput): IMessageHandle {
    if (msg.Code >= 200 && msg.Code < 300) {
      return this.showSuccess(msg);
    } else {
      return this.showError(msg);
    }
  }

  public showInfo(msg: MsgInfo): IMessageHandle {
    return this.instance.info({
      type: "info",
      message: handMsgInfo(msg),
      showClose: false,
      center: true,
      duration: 2000,
      offset: 10,
      customClass: "message_cust_info"
    });
  }

  public closeAll(): void {
    this.instance.closeAll();
  }
}

export const elMessage: IMessage = ElMessage;
const getMessage = (): ShowMessage => new ElMessageProvider(elMessage);
export const message: ShowMessage = getMessage();

export default {
  install: <T>(app: App<T>): void => {
    app.config.globalProperties.$elMessage = elMessage;
    app.config.globalProperties.$message = message;
    app.provide("$elMessage", elMessage);
    app.provide("$message", message);
  }
} as Plugin;
