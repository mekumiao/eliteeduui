import type { App, ComponentPublicInstance } from "vue";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import { sleep } from "@/utils/my-thread";

async function logout(
  this: ComponentPublicInstance,
  path?: string
): Promise<void> {
  try {
    this.$loading();
    await sleep();
    this.$storeMutations.resetState();
    window.localStorage.clear();
    const re = path ?? "/login";
    this.$router.push(re);
  } finally {
    this.$closeLoading();
  }
}

function logoutConfirm(this: ComponentPublicInstance, path?: string): void {
  if (this.$store.state.accessToken) {
    layer.confirm("确定要重新登录吗?", { btn: ["确定", "取消"] }, (idx) => {
      layer.close(idx);
      this.$logout(path);
    });
  } else {
    this.$logout(path);
  }
}

export default {
  install: <T>(app: App<T>) => {
    app.config.globalProperties.$logout = logout;
    app.config.globalProperties.$logoutConfirm = logoutConfirm;
  }
} as Plugin;
