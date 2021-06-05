<template>
  <div class="home-left-menu">
    <div class="logo" v-show="!isCollapse">爱利特教务系统</div>
    <el-menu
      :default-active="currentActive"
      :collapse="isCollapse"
      unique-opened
      background-color="#313743"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <app-menu-item :menu-data="menuData"></app-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import menulist from "@/config/menu-data";
import { inject, reactive, ref } from "@vue/runtime-core";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { defineComponent } from "vue";
import AppMenuItem from "./AppMenuItem.vue";

export default defineComponent({
  components: { AppMenuItem },
  name: "HomeLeftMenu",
  setup() {
    const menuData = reactive(menulist);
    const isCollapse = inject("isCollapse", ref(false));
    const currentActive = inject("currentActive", ref(""));

    onBeforeMount(() => {
      const route = useRoute();
      currentActive.value = route.path;
    });

    onBeforeRouteUpdate((to) => {
      currentActive.value = to.path;
    });

    onBeforeRouteLeave((to) => {
      currentActive.value = to.path;
    });
    return { isCollapse, currentActive, menuData };
  }
});
</script>

<style lang="scss" scoped>
.home-left-menu {
  background-color: $left-menu-color;
  min-height: 100%;

  .logo {
    background-color: $left-menu-color;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    width: $menu-left-open-width;
    overflow: hidden;
    height: 60px;
    font-size: 25px;
    color: #fff;
    padding-left: 20px;
    margin: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .el-menu {
    background-color: $left-menu-color;
    padding-top: 60px;
    border: 0px;
    text-align: left;
    color: #babbbd;
  }
}
</style>
