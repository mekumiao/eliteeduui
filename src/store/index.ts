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
import router from "@/router";
import { getRoutePath } from "@/plugins/my-routeMap";

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
  componentName: string;
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

const createDefaultTab = (): TabInfo => {
  return {
    active: 0,
    max: 10,
    tabs: [
      {
        path: firstMenuItem?.index ?? "",
        name: firstMenuItem?.title ?? "",
        componentName: "Welcome"
      }
    ]
  };
};

const createState = (): State => {
  return {
    user: undefined,
    accessToken: undefined,
    isRouterActive: true,
    opendRouter: createDefaultTab(),
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
    onlyAddOrUpdateOpenRouterPaths(
      state: State,
      data: { path: string; componentName: string }
    ): void {
      const route = _.last(getRoutePath(data.path));
      if (route) {
        const index = _.findIndex(
          state.opendRouter.tabs,
          (x) => x.path === data.path
        );
        if (index < 0) {
          const nextIndex = state.opendRouter.tabs.length;
          state.opendRouter.tabs.push({
            path: data.path,
            name: route.title,
            componentName: data.componentName
          });
          state.opendRouter.active = nextIndex;
        } else {
          state.opendRouter.active = index;
        }
      }
    },
    changeOpendRouterPaths(state: State, index: number): void {
      if (index >= 0 && index < state.opendRouter.tabs.length) {
        state.opendRouter.active = index;
        const tab = state.opendRouter.tabs[index];
        router.push(tab.path);
      }
    },
    removeOpendRouterPaths(state: State, index: number): void {
      if (index > 0 && index < state.opendRouter.tabs.length) {
        state.opendRouter.tabs.splice(index, 1);
        //当关闭选择的标签时
        if (index === state.opendRouter.active) {
          //当关闭末尾的标签时
          if (index === state.opendRouter.tabs.length) {
            state.opendRouter.active--;
          }
          const tab = state.opendRouter.tabs[state.opendRouter.active];
          router.push(tab.path);
        } else if (index < state.opendRouter.active) {
          state.opendRouter.active--;
          const tab = state.opendRouter.tabs[state.opendRouter.active];
          router.push(tab.path);
        }
      }
    },
    removeOtherOpendRouterPaths(state: State, index: number): void {
      if (state.opendRouter.tabs.length > 1) {
        if (index === 0) {
          Object.assign(state.opendRouter, createDefaultTab());
          router.push(state.opendRouter.tabs[0].path);
        } else if (index > 0 && index < state.opendRouter.tabs.length) {
          const tab = state.opendRouter.tabs[index];
          Object.assign(state.opendRouter, createDefaultTab());
          state.opendRouter.active = 1;
          state.opendRouter.tabs.push(tab);
          router.push(tab.path);
        }
      }
    },
    removeRightOpendRouterPaths(state: State, index: number): void {
      if (state.opendRouter.tabs.length > 1) {
        if (index >= 0 && index < state.opendRouter.tabs.length - 1) {
          const tab = state.opendRouter.tabs[index];
          state.opendRouter.tabs.splice(index + 1);
          if (index < state.opendRouter.active) {
            state.opendRouter.active = index;
            router.push(tab.path);
          }
        }
      }
    },
    resetOpendRouterPaths(state: State): void {
      Object.assign(state.opendRouter, createDefaultTab());
      router.push(state.opendRouter.tabs[state.opendRouter.active].path);
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
        sourceHost.Value ?? setting.defaultSourceHost
      );
      context.commit(
        "setUploadHost",
        uploadHost.Value ?? setting.defaultUploadHost
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
  /**仅添加或修改打开的标签路由 */
  onlyAddOrUpdateOpenRouterPaths(data: {
    path: string;
    componentName: string;
  }): void;
  changeOpendRouterPaths(index: number): void;
  removeOtherOpendRouterPaths(index: number): void;
  removeOpendRouterPaths(index: number): void;
  removeRightOpendRouterPaths(index: number): void;
  resetOpendRouterPaths(): void;
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
      onlyAddOrUpdateOpenRouterPaths(
        this: ComponentPublicInstance,
        data: { path: string; componentName: string }
      ) {
        store.commit("onlyAddOpenRouterPaths", data);
      },
      changeOpendRouterPaths(this: ComponentPublicInstance, index: number) {
        store.commit("changeOpendRouterPaths", index);
      },
      removeOtherOpendRouterPaths(
        this: ComponentPublicInstance,
        index: number
      ) {
        store.commit("removeOtherOpendRouterPaths", index);
      },
      removeOpendRouterPaths(this: ComponentPublicInstance, index: number) {
        store.commit("removeOpendRouterPaths", index);
      },
      removeRightOpendRouterPaths(
        this: ComponentPublicInstance,
        index: number
      ) {
        store.commit("removeRightOpendRouterPaths", index);
      },
      resetOpendRouterPaths(this: ComponentPublicInstance) {
        store.commit("resetOpendRouterPaths");
      },
      resetState(this: ComponentPublicInstance) {
        store.commit("resetState");
      }
    } as MyStoreMutations;
  }
} as Plugin;
