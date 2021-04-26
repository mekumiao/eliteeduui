import { IMessage } from "element-plus/lib/el-message/src/types";
import { ShowMessage } from "@/plugins/el-message";
import { NProgress } from "nprogress";
import { INotification } from "element-plus/lib/el-notification/src/notification.type";
import { Store } from "vuex";
import { Rules } from "@/types/el-rules";
import { Layer } from "@/types/my-layer";

declare module "@vue/runtime-core" {
  declare interface State {
    homeMenuCollapse: boolean;
    homeMenuActive: string;
  }

  declare interface ComponentCustomProperties {
    $store: Store<State>;
    $elMessage: IMessage;
    $message: ShowMessage;
    $loading(): number;
    $closeLoading(): void;
    $nprogress: NProgress;
    $notify: INotification;
    $layer: Layer;
    $useRules(ref: string | Record<string, unknown>): Rules;
  }
}
