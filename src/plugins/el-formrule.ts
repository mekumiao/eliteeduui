import type { App, ComponentPublicInstance } from "vue";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import type { Rules } from "@/types/el-rules";

function useRules(this: ComponentPublicInstance, ref: string | unknown): Rules {
  debugger;
  if (typeof ref === "string") {
    return this.$refs[ref as string] as Rules;
  } else {
    return ref as Rules;
  }
}

export default {
  install: <T>(app: App<T>) => {
    app.config.globalProperties.$useRules = useRules;
  }
} as Plugin;
