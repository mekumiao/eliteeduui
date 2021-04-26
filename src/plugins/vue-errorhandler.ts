import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import type { App } from "vue";

export default {
  install: <T>(app: App<T>) => {
    if (process.env.NODE_ENV === "production") {
      app.config.errorHandler = (_err, _instance, info) => {
        console.error(info);
      };
      app.config.warnHandler = (msg) => {
        console.warn(msg);
      };
    }
  }
} as Plugin;
