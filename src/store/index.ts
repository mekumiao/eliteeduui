import { InjectionKey } from "vue";
import {
  createStore,
  Store,
  useStore as baseUseStore,
  createLogger,
  ActionContext
} from "vuex";
import _ from "lodash";
import { apiSystemConfig } from "@/apis/adminSystemConfigApi";
import menuList from "@/config/menu-data";
import createPersistedState from "vuex-persistedstate";

export interface TabInfo {
  active: number;
  tabs: TabItem[];
}

export interface TabItem {
  path: string;
  name: string;
}

export interface State {
  /**路由是否激活 */
  isRouterActive: boolean;
  /**资源路径 */
  SourceHost: string | undefined;
  /**打开的路由路径 */
  opendRouter: TabInfo;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};

const debug = process.env.NODE_ENV !== "production";
const createPersisted = () => {
  return createPersistedState({
    storage: window.localStorage
  });
};
const firstMenuItem = _.first(menuList);
const defaultTab: TabItem = {
  path: firstMenuItem?.index ?? "",
  name: firstMenuItem?.title ?? ""
};

export default createStore<State>({
  state: {
    isRouterActive: true,
    opendRouter: {
      active: 0,
      tabs: [defaultTab]
    },
    SourceHost: undefined
  },
  mutations: {
    setIsRouterActive(state: State, value: boolean): void {
      state.isRouterActive = value;
    },
    setSourceHost(state: State, host: string): void {
      state.SourceHost = host;
    },
    changeOpendRouterPaths(state: State, value: TabItem): void {
      const index = _.findIndex(
        state.opendRouter.tabs,
        (x) => x.path === value.path
      );
      if (index < 0) {
        const nextIndex = state.opendRouter.tabs.length;
        state.opendRouter.tabs.push(value);
        state.opendRouter.active = nextIndex;
      } else {
        state.opendRouter.active = index;
      }
    },
    removeOpendRouterPaths(state: State, index: number): void {
      if (index > 0) {
        state.opendRouter.tabs.splice(index, 1);
        if (state.opendRouter.active >= index) {
          state.opendRouter.active--;
        }
      }
    }
  },
  actions: {
    async LoadSourceHost(context: ActionContext<State, State>): Promise<void> {
      if (context.state.SourceHost === undefined) {
        const sourceHost = await apiSystemConfig.GetSystemConfigByName(
          "SourceHost"
        );
        context.commit("setSourceHost", sourceHost.Value?.Value);
      }
    }
  },
  getters: {
    mergeSourceHost:
      (state: State) =>
      (url: string): string => {
        const sourceHostTrim = state.SourceHost?.replace(/(\/)*$/gi, "");
        const urlTrim = url?.replace(/^(\/)*/gi, "");
        return `${sourceHostTrim}/${urlTrim}`;
      }
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersisted()] : [createPersisted()]
});
