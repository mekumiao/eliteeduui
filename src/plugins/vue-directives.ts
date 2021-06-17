/**自定义指令 */
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import type { App } from "vue";

export default {
  install: <T>(app: App<T>) => {
    //权限指令
    app.directive("allow", {
      mounted: (el, binding, vnode) => {
        el;
        binding;
        vnode;
        // if (binding.value === "xxx"){
        // }
      }
    });
    //聚焦元素指令
    app.directive("focus", {
      mounted(el) {
        debugger;
        el.focus();
      }
    });
  }
} as Plugin;
