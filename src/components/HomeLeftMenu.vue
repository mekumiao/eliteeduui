<template>
  <div class="home-left-menu">
    <router-link to="/" class="home-route">
      <img class="logo logo-ico" src="@/assets/logo.png" />
      <transition
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutLeft"
        mode="out-in"
      >
        <div class="logo logo-txt" v-show="!isCollapse">{{ systemName }}</div>
      </transition>
    </router-link>

    <el-menu
      :default-active="currentActive"
      :collapse="isCollapse"
      background-color="#191A23"
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
import { onBeforeMount, defineComponent } from "vue";
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
  width: $menu-left-open-width;
  background-color: $left-menu-color;
  min-height: 100%;

  .logo {
    background-color: $left-menu-color;
    height: 58px;
    position: fixed;
    top: 2px;
    left: 0;
    border: 0;
    margin: 0;
  }

  .logo-ico {
    height: 58px;
    width: 60px;
    z-index: 2;
  }

  .logo-txt {
    z-index: 1;
    margin-left: 60px;
    height: 58px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    overflow: hidden;
    font-size: 25px;
    color: #fff;
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
