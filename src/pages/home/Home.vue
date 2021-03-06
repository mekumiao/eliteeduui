﻿<template>
  <el-container class="home">
    <!-- 左侧菜单 -->
    <el-aside :width="leftWidth + 'px'">
      <home-left-menu></home-left-menu>
    </el-aside>

    <el-container>
      <!-- 顶部菜单 -->
      <el-header>
        <home-top-menu></home-top-menu>
      </el-header>

      <!-- 内容区域 -->
      <el-main>
        <!-- 标签切换组件 -->
        <section class="work-tab">
          <app-work-tab></app-work-tab>
        </section>

        <!-- 路由视图 -->
        <router-view v-slot="{ Component }" v-if="isRouterActive">
          <transition
            name="my-fade"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <keep-alive :include="includeComponent" :max="cacheMaxViewNumber">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { sleep } from "@/utils/my-thread";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  async beforeMount() {
    await this.$storeActions.initConfig();
  },
  computed: {
    isCollapse() {
      return this.$store.state.leftMenu.isCollapse;
    },
    leftWidth() {
      return this.$store.state.leftMenu.width;
    },
    isRouterActive: {
      get(): boolean {
        return this.$store.state.isRouterActive;
      },
      set(newValue: boolean): void {
        this.$storeMutations.setIsRouterActive(newValue);
      }
    },
    cacheMaxViewNumber(): number {
      return this.$store.state.opendRouter.max;
    },
    includeComponent(): Array<string> {
      return this.$store.state.opendRouter.tabs.map((x) => x.componentName);
    }
  },
  provide() {
    return { reload: this.reload };
  },
  methods: {
    async reload(): Promise<void> {
      this.$loading();
      this.isRouterActive = false;
      await sleep();
      this.$nextTick(() => {
        this.isRouterActive = true;
        this.$closeLoading();
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0;
  margin: 0;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-main {
  background-color: $default-background;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;

  .work-tab {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}

aside {
  transition: width 300ms ease-in-out;
  -webkit-transition: width 300ms ease-in-out;
}

aside::-webkit-scrollbar {
  display: none;
}

aside {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
