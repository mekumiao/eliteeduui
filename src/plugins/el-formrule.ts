import type { App, ComponentPublicInstance } from "vue";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";

function useRules(
  this: ComponentPublicInstance,
  ref: string | unknown
): RulesValidate {
  if (typeof ref === "string") {
    return this.$refs[ref as string] as RulesValidate;
  } else {
    return ref as RulesValidate;
  }
}

export default {
  install: <T>(app: App<T>) => {
    app.config.globalProperties.$useRules = useRules;
  }
} as Plugin;
