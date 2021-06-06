<template>
  <div class="home-left-menu">
    <img class="logo" v-show="isCollapse" src="@/assets/logo.png" />
    <div class="logo logo-txt" v-show="!isCollapse">{{ systemName }}</div>
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
import AppSetting from "@/config/app-setting";

export default defineComponent({
  components: { AppMenuItem },
  name: "HomeLeftMenu",
  setup() {
    const menuData = reactive(menulist);
    const isCollapse = inject("isCollapse", ref(false));
    const currentActive = inject("currentActive", ref(""));
    const systemName = ref(AppSetting.systemName);

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
    return { isCollapse, currentActive, menuData, systemName };
  }
});
</script>

<style lang="scss" scoped>
.home-left-menu {
  background-color: $left-menu-color;
  min-height: 100%;

  .logo {
    background-color: $left-menu-color;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    border: 0;
    margin: 0;
  }

  .logo-txt {
    width: $menu-left-open-width;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    overflow: hidden;
    font-size: 25px;
    color: #fff;
    padding-left: 20px;
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
