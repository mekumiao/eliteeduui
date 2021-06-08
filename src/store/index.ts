import { InjectionKey } from "vue";
import {
  createStore,
  Store,
  useStore as baseUseStore,
  createLogger
} from "vuex";
import type { State } from "@vue/runtime-core";
import systemConfig from "@/store/modules/systemConfig";

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    systemConfig: systemConfig
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
