import type { IMessage } from "element-plus/lib/el-message/src/types";
import type { ShowMessage } from "@/plugins/el-message";
import type { NProgress } from "nprogress";
import type { INotification } from "element-plus/lib/el-notification/src/notification.type";
import type { Store } from "vuex";
import type { State } from "@/store/index";

declare module "@vue/runtime-core" {
  declare interface ComponentCustomProperties {
    $store: Store<State>;
    $elMessage: IMessage;
    $message: ShowMessage;
    $loading(): number;
    $closeLoading(): void;
    $nprogress: NProgress;
    $notify: INotification;
    $layer: Layer;
    $useRules(ref: string | Record<string, unknown>): RulesValidate;
    $logout(path?: string): Promise<void>;
    $logoutConfirm(path?: string): void;
  }
}
