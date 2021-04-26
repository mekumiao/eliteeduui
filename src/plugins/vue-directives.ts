/**自定义指令 */
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import type { App } from "vue";

export default {
  install: <T>(app: App<T>) => {
    app.directive("allow", {
      mounted: (el, binding, vnode) => {
        el;
        binding;
        vnode;
        // if (binding.value === "xxx"){
        // }
      }
    });

    app.directive("focus", {
      mounted(el) {
        el.focus(); // 聚焦元素
      }
    });
  }
} as Plugin;
