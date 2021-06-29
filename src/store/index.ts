import { App, ComponentPublicInstance, InjectionKey } from "vue";
import {
  createStore,
  Store,
  useStore as baseUseStore,
  createLogger,
  ActionContext
} from "vuex";
import _ from "lodash";
import { apiAdminSystemConfig } from "@/apis/adminSystemConfigApi";
import menuList from "@/config/menu-data";
import setting from "@/config/app-setting";
import createPersistedState from "vuex-persistedstate";
import { decodeAccessToken, TokenInfo } from "@/utils/my-token";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";

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
  sourceHost: string;
  /**上传路径 */
  uploadHost: string;
  /**打开的路由路径 */
  opendRouter: TabInfo;
  /**左侧菜单 */
  leftMenu: {
    /**是否收起 */
    isCollapse: boolean;
    /**菜单宽度 */
    width: number;
  };
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
    leftMenu: {
      isCollapse: false,
      width: setting.homeMenuOpenWidth
    },
    sourceHost: setting.defaultSourceHost,
    uploadHost: setting.defaultUploadHost
  };
};

const store = createStore<State>({
  state: createState(),
  mutations: {
    setAccessToken(state: State, token: string): void {
      state.accessToken = token;
      state.user = decodeAccessToken(token);
    },
    setIsRouterActive(state: State, value: boolean): void {
      state.isRouterActive = value;
    },
    setIsCollapse(state: State, value: boolean): void {
      if (value) {
        state.leftMenu.width = setting.homeMenuShrinkWidth;
      } else {
        state.leftMenu.width = setting.homeMenuOpenWidth;
      }
      state.leftMenu.isCollapse = value;
    },
    setSourceHost(state: State, host: string): void {
      if (host) {
        state.sourceHost = host;
      }
    },
    setUploadHost(state: State, host: string) {
      if (host) {
        state.uploadHost = host;
      }
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
    async initConfig(context: ActionContext<State, State>): Promise<void> {
      const sourceHost =
        await apiAdminSystemConfig.GetSystemConfigByNameNoThrow("sourcehost");
      const uploadHost =
        await apiAdminSystemConfig.GetSystemConfigByNameNoThrow("uploadurl");
      context.commit(
        "setSourceHost",
        sourceHost?.Value?.Value ?? setting.defaultSourceHost
      );
      context.commit(
        "setUploadHost",
        uploadHost?.Value?.Value ?? setting.defaultUploadHost
      );
    }
  },
  getters: {
    mergeSourceHost:
      (state: State) =>
      (url: string): string => {
        const sourceHostTrim = state.sourceHost?.replace(/(\/)*$/gi, "");
        const urlTrim = url?.replace(/^(\/)*/gi, "");
        return `${sourceHostTrim}/${encodeURI(urlTrim)}`;
      }
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersisted()] : [createPersisted()]
});

export interface MyStoreGetters {
  mergeSourceHost(url: string): string;
}

export interface MyStoreActions {
  initConfig(): Promise<void>;
}

export interface MyStoreMutations {
  setAccessToken(token: string): void;
  setIsRouterActive(value: boolean): void;
  setIsCollapse(value: boolean): void;
  setSourceHost(host: string): void;
  setUploadHost(host: string): void;
  changeOpendRouterPaths(value: TabItem): void;
  removeOpendRouterPaths(index: number): void;
  resetState(): void;
}

export default {
  install: <T>(app: App<T>) => {
    Window.prototype.store = store;
    app.use(store, key);
    app.config.globalProperties.$storeGetters = {
      mergeSourceHost(this: ComponentPublicInstance, url: string) {
        return store.getters.mergeSourceHost(url);
      }
    } as MyStoreGetters;
    app.config.globalProperties.$storeActions = {
      async initConfig(this: ComponentPublicInstance): Promise<void> {
        await store.dispatch("initConfig");
      }
    } as MyStoreActions;
    app.config.globalProperties.$storeMutations = {
      setAccessToken(this: ComponentPublicInstance, token: string) {
        store.commit("setAccessToken", token);
      },
      setIsRouterActive(this: ComponentPublicInstance, value: boolean) {
        store.commit("setIsRouterActive", value);
      },
      setIsCollapse(this: ComponentPublicInstance, value: boolean) {
        store.commit("setIsCollapse", value);
      },
      setSourceHost(this: ComponentPublicInstance, host: string) {
        store.commit("setSourceHost", host);
      },
      setUploadHost(this: ComponentPublicInstance, host: string) {
        store.commit("setUploadHost", host);
      },
      changeOpendRouterPaths(this: ComponentPublicInstance, value: TabItem) {
        store.commit("changeOpendRouterPaths", value);
      },
      removeOpendRouterPaths(this: ComponentPublicInstance, index: number) {
        store.commit("removeOpendRouterPaths", index);
      },
      resetState(this: ComponentPublicInstance) {
        store.commit("resetState");
      }
    } as MyStoreMutations;
  }
} as Plugin;
