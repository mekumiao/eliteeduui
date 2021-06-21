import { App, ComponentPublicInstance } from "vue";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import { sleep } from "@/utils/my-thread";

async function logout(
  this: ComponentPublicInstance,
  path?: string
): Promise<void> {
  try {
    this.$loading();
    await sleep(500);
    this.$store.commit("resetState");
    window.localStorage.clear();
    this.$router.push(path ?? "/login");
  } finally {
    this.$closeLoading();
  }
}

function logoutConfirm(this: ComponentPublicInstance, path?: string): void {
  layer.confirm("确定要退出吗?", { btn: ["确定", "取消"] }, async (idx) => {
    layer.close(idx);
    this.$logout(path);
  });
}

export default {
  install: <T>(app: App<T>) => {
    app.config.globalProperties.$logout = logout;
    app.config.globalProperties.$logoutConfirm = logoutConfirm;
  }
} as Plugin;
