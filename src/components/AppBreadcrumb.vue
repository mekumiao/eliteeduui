<template>
  <div class="app-breadcrumb" v-if="linkArray && linkArray.length > 0">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in linkArray" :key="index">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from "vue-router";
import { defineComponent, onBeforeMount, ref } from "vue";
import { getRoutePath, RouteMapInfo } from "@/plugins/my-routeMap";

export default defineComponent({
  name: "AppBreadcrumb",
  setup() {
    let linkArray = ref<RouteMapInfo[]>([]);

    onBeforeMount(() => {
      const path = useRoute().path;
      linkArray.value = getRoutePath(path) || [];
    });

    onBeforeRouteUpdate((to) => {
      linkArray.value = getRoutePath(to.path) || [];
    });

    onBeforeRouteLeave((to) => {
      linkArray.value = getRoutePath(to.path) || [];
    });

    return { linkArray };
  }
});
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
