<template>
  <template v-for="(item, index) in menuData">
    <el-submenu
      v-if="isNotEmpty(item.children)"
      :index="item.index"
      :key="index"
    >
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <app-menu-item :menu-data="item.children"></app-menu-item>
    </el-submenu>

    <el-menu-item
      v-else-if="item.show || item.show === undefined"
      :index="item.index"
      :key="item.index"
    >
      <i :class="item.icon"></i>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { MenuItem } from "@/config/menu-data";

export default defineComponent({
  name: "AppMenuItem",
  props: {
    menuData: { type: Array as PropType<MenuItem[]>, required: true }
  },
  methods: {
    isNotEmpty(children: MenuItem[] | undefined): boolean {
      return (
        !!children &&
        children.length > 0 &&
        children.filter((x) => x.show === undefined || x.show === true).length >
          0
      );
    }
  }
});
</script>
