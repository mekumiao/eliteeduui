import { Plugin } from "@vue/runtime-core/dist/runtime-core";
import { App } from "vue";

let index: number | undefined = undefined;

const loading = (): number => {
  index = layer.load(0, {
    shade: 0.1
  });
  return index;
};

const closeLoading = (): void => {
  if (index) layer.close(index);
};

export default {
  install: <T>(app: App<T>): void => {
    app.config.globalProperties.$loading = loading;
    app.config.globalProperties.$closeLoading = closeLoading;
    app.config.globalProperties.$layer = layer;
    app.provide("$loading", loading);
    app.provide("$closeLoading", closeLoading);
    app.provide("$layer", layer);
  }
} as Plugin;
