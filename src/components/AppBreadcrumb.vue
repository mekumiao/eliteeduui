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
import menuList, { MenuItem } from "@/config/menu-data";
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from "vue-router";
import { defineComponent, onBeforeMount, reactive } from "vue";

interface AppBreadcrumbInfo {
  title: string;
  to?: string;
}

/**
 * 1.将path 根据 '/' 拆分为 paths数组
 * 2.遍历数组 根据数组深度  再 menulist 中同深度的位置查找
 * 3. menulist 中的 subMenus 是下一层次的项,而 menuItems是本层次的项
 * 4.递归实现
 */
const findMenu = (
  path: string,
  data: MenuItem[]
): AppBreadcrumbInfo[] | undefined => {
  for (const currenItem of data) {
    if (currenItem.children) {
      const res = findMenu(path, currenItem.children);
      if (res) {
        res?.unshift({ title: currenItem.title, to: currenItem.index });
        return res;
      }
    } else {
      if (currenItem.index === path) {
        return [{ title: currenItem.title, to: currenItem.index }];
      }
    }
  }
  return undefined;
};

const exclude = ["/home/welcome"];

/**获取路径信息 */
const getMenu = (path: string): AppBreadcrumbInfo[] | undefined => {
  if (exclude.filter((x) => x === path).length <= 0) {
    return findMenu(path, menuList);
  }
  return undefined;
};

export default defineComponent({
  name: "AppBreadcrumb",
  setup() {
    let linkArray = reactive<AppBreadcrumbInfo[]>([]);

    onBeforeMount(() => {
      const path = useRoute().path;
      linkArray = getMenu(path) || [];
    });

    onBeforeRouteUpdate((to) => {
      linkArray = getMenu(to.path) || [];
    });

    onBeforeRouteLeave((to) => {
      linkArray = getMenu(to.path) || [];
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
