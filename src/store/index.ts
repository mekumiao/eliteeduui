import { InjectionKey } from "vue";
import {
  createStore,
  Store,
  useStore as baseUseStore,
  createLogger
} from "vuex";
import systemConfig from "@/store/modules/systemConfig";

export interface State {
  isRouterActive: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};

const debug = process.env.NODE_ENV !== "production";

export default createStore<State>({
  modules: {
    systemConfig: systemConfig
  },
  state: {
    isRouterActive: true
  },
  mutations: {
    setIsRouterActive(state: State, value: boolean): void {
      state.isRouterActive = value;
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
