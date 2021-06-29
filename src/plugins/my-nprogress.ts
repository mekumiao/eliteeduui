import Np from "nprogress";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import type { App } from "vue";

export const nprogress = Np.configure({
  showSpinner: false,
  easing: "ease",
  speed: 200,
  minimum: 0.08
});

export default {
  install: <T>(app: App<T>): void => {
    app.config.globalProperties.$nprogress = nprogress;
    app.provide("$nprogress", nprogress);
  }
} as Plugin;
