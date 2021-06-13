import { apiSystemConfig } from "@/apis/adminSystemConfigApi";
import { ActionContext } from "vuex";
import type { State } from "@/store/index";

export interface SystemConfigState {
  SourceHost: string | undefined;
}

const state = (): SystemConfigState => ({
  SourceHost: undefined
});

const mutations = {
  setSourceHost(state: SystemConfigState, host: string): void {
    state.SourceHost = host;
  }
};

const actions = {
  async LoadSourceHost(
    context: ActionContext<SystemConfigState, State>
  ): Promise<void> {
    if (context.state.SourceHost === undefined) {
      const sourceHost = await apiSystemConfig.GetSystemConfigByName(
        "SourceHost"
      );
      context.commit("setSourceHost", sourceHost.Value?.Value);
    }
  }
};

const getters = {
  mergeSourceHost:
    (state: SystemConfigState) =>
    (url: string): string => {
      const sourceHostTrim = state.SourceHost?.replace(/(\/)*$/gi, "");
      const urlTrim = url?.replace(/^(\/)*/gi, "");
      return `${sourceHostTrim}/${urlTrim}`;
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
