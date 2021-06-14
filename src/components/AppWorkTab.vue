<template>
  <div class="app-work-tab">
    <el-tag
      size="medium"
      effect="plain"
      v-for="(tab, idx) in opendRouter.tabs"
      :disable-transitions="false"
      :closable="idx !== 0"
      :class="idx === opendRouter.active ? 'tab-active' : ''"
      :key="idx"
      @close="handleClose(tab, idx)"
      @click.stop="handleClick(tab.path)"
    >
      {{ tab.name }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { TabInfo, useStore } from "@/store/index";
import { getRoutePath } from "@/plugins/my-routeMap";
import _ from "lodash";

export default defineComponent({
  name: "AppWorkTab",
  setup() {
    const store = useStore();
    const commitPath = (path: string): void => {
      const route = getRoutePath(path);
      const routeInfo = _.last(route);
      if (routeInfo) {
        store.commit("changeOpendRouterPaths", {
          path: path,
          name: routeInfo.title
        });
      }
    };
    onBeforeMount(() => {
      const path = useRoute().path;
      commitPath(path);
    });

    onBeforeRouteUpdate((to) => {
      commitPath(to.path);
    });

    onBeforeRouteLeave((to) => {
      commitPath(to.path);
    });
    return {};
  },
  computed: {
    opendRouter(): TabInfo {
      return this.$store.state.opendRouter;
    }
  },
  methods: {
    handleClose(_tab: TabInfo, index: number): void {
      layer.confirm(
        "确认移除标签?",
        { btn: ["确认", "取消"], shadeClose: true },
        (idx) => {
          this.$store.commit("removeOpendRouterPaths", index);
          const tab =
            this.$store.state.opendRouter.tabs[
              this.$store.state.opendRouter.active
            ];
          if (this.$route.path !== tab.path) {
            this.$router.push(tab.path);
          }
          layer.close(idx);
        }
      );
    },
    handleClick(path: string): void {
      this.$router.push(path);
    }
  }
});
</script>

<style lang="scss" scoped>
.app-work-tab {
  margin: 10px auto;

  .el-tag {
    margin-right: 5px;
    border-radius: 0;
    background-color: #fff;
    color: #999;
    border: 0;
  }

  .el-tag:hover {
    background-color: #cee3ec;
    cursor: pointer;
  }

  .tab-active {
    color: #27658a;
    font-weight: 400;
  }
}
</style>
