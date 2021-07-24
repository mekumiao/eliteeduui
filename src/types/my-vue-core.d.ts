import type { IMessage } from "element-plus/lib/el-message/src/types";
import type { ShowMessage } from "@/plugins/el-message";
import type { NProgress } from "nprogress";
import type { INotification } from "element-plus/lib/el-notification/src/notification.type";
import type { Store } from "vuex";
import type {
  State,
  MyStoreGetters,
  MyStoreActions,
  MyStoreMutations
} from "@/store/index";

declare module "@vue/runtime-core" {
  declare interface ComponentCustomProperties {
    /**store */
    $store: Store<State>;
    /**store取值器 */
    $storeGetters: MyStoreGetters;
    /**store方法 */
    $storeActions: MyStoreActions;
    /**设置store值 */
    $storeMutations: MyStoreMutations;
    /**element-ui消息弹出层 */
    $elMessage: IMessage;
    /**消息弹出层 */
    $message: ShowMessage;
    /**显示加载层 */
    $loading(): number;
    /**关闭加载层 */
    $closeLoading(): void;
    /**进度条 */
    $nprogress: NProgress;
    /**通知 */
    $notify: INotification;
    /**弹出层组件 */
    $layer: Layer;
    /**使用表单验证 */
    $useRules(ref: string | Record<string, unknown>): RulesValidate;
    /**退出登录 */
    $logout(path?: string): Promise<void>;
    /**退出登录并且需要用户确认 */
    $logoutConfirm(path?: string): void;
  }
}
