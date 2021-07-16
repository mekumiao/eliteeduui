<template>
  <div class="app-work-tab">
    <el-dropdown
      trigger="contextmenu"
      @command="handleCommand($event, idx)"
      v-for="(tab, idx) in opendRouter.tabs"
      :key="idx"
    >
      <el-tag
        size="medium"
        effect="plain"
        :disable-transitions="false"
        :closable="idx !== 0"
        :class="idx === opendRouter.active ? 'tab-active' : ''"
        @close="removeTab(idx)"
        @click.stop="changeTab(tab.path)"
      >
        {{ tab.name }}
      </el-tag>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="right" icon="el-icon-circle-plus">
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other" icon="el-icon-circle-plus">
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item command="all" icon="el-icon-circle-plus">
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { TabInfo, useStore } from "@/store/index";

export default defineComponent({
  name: "AppWorkTab",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      const path = useRoute().path;
      store.commit("onlyAddOpenRouterPaths", path);
    });
    onBeforeRouteUpdate((to) => {
      store.commit("onlyAddOpenRouterPaths", to.path);
    });
    onBeforeRouteLeave((to) => {
      store.commit("onlyAddOpenRouterPaths", to.path);
    });
    return {};
  },
  computed: {
    opendRouter(): TabInfo {
      return this.$store.state.opendRouter;
    }
  },
  methods: {
    changeTab(path: string): void {
      this.$storeMutations.changeOpendRouterPaths(path);
    },
    removeTab(index: number) {
      this.$storeMutations.removeOpendRouterPaths(index);
    },
    handleCommand(command: string, idx: number) {
      if (command === "right") {
        this.$storeMutations.removeRightOpendRouterPaths(idx);
      } else if (command === "other") {
        this.$storeMutations.removeOtherOpendRouterPaths(idx);
      } else if (command === "all") {
        this.$storeMutations.resetOpendRouterPaths();
      } else {
        layer.msg(`操作:${command}.索引:${idx}`);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.app-work-tab {
  .el-tag {
    margin-right: 5px;
    border-radius: 3px;
    background-color: #fff;
    color: #999;
    border: 0;
  }

  .el-tag:hover {
    background-color: #f0efef;
    cursor: pointer;
  }

  .tab-active {
    color: $theme-color;
    font-weight: 400;
  }
}
</style>
