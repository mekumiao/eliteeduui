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
import setting from "@/config/app-setting";
import createPersistedState from "vuex-persistedstate";
import { decodeAccessToken, TokenInfo } from "@/utils/my-token";

declare global {
  interface Window {
    store: Store<State>;
  }
}

export interface TabInfo {
  active: number;
  max: number;
  tabs: TabItem[];
}

export interface TabItem {
  path: string;
  name: string;
}

export interface State {
  /**用户信息 */
  user: TokenInfo | undefined;
  accessToken: string | undefined;
  /**路由是否激活 */
  isRouterActive: boolean;
  /**资源路径 */
  sourceHost: string | undefined;
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

const createState = (): State => {
  return {
    user: undefined,
    accessToken: undefined,
    isRouterActive: true,
    opendRouter: {
      active: 0,
      max: 10,
      tabs: [defaultTab]
    },
    sourceHost: setting.defaultSourceHost
  };
};

Window.prototype.store = createStore<State>({
  state: createState(),
  mutations: {
    setAccessToken(state: State, token: string): void {
      state.accessToken = token;
      state.user = decodeAccessToken(token);
    },
    setIsRouterActive(state: State, value: boolean): void {
      state.isRouterActive = value;
    },
    setSourceHost(state: State, host: string): void {
      state.sourceHost = host;
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
      if (index > 0 && index < state.opendRouter.tabs.length) {
        state.opendRouter.tabs.splice(index, 1);
        if (index === state.opendRouter.active) {
          if (index >= state.opendRouter.tabs.length) {
            state.opendRouter.active = state.opendRouter.tabs.length - 1;
          }
        } else if (index <= state.opendRouter.active) {
          state.opendRouter.active--;
        }
      }
    },
    resetState(state: State) {
      Object.assign(state, createState());
    }
  },
  actions: {
    async LoadSourceHost(context: ActionContext<State, State>): Promise<void> {
      const sourceHost = await apiSystemConfig.GetSystemConfigByNameAtStore(
        "sourcehost"
      );
      context.commit("setSourceHost", sourceHost?.Value?.Value);
    }
  },
  getters: {
    mergeSourceHost:
      (state: State) =>
      (url: string): string => {
        const sourceHostTrim = state.sourceHost?.replace(/(\/)*$/gi, "");
        const urlTrim = url?.replace(/^(\/)*/gi, "");
        return `${sourceHostTrim}/${urlTrim}`;
      }
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersisted()] : [createPersisted()]
});

export default window.store;
