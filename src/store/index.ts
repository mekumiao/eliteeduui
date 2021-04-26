import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import type { State } from "@vue/runtime-core";

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = (): Store<State> => {
  return baseUseStore(key);
};

export default createStore({
  state: {
    homeMenuCollapse: false,
    homeMenuActive: ""
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
});
