<template>
  <el-container class="home">
    <!-- 左侧菜单 -->
    <el-aside :width="leftWidth">
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
        <app-work-tab></app-work-tab>

        <!-- 路由视图 -->
        <router-view v-slot="{ Component }" v-if="isRouterActive">
          <transition
            name="my-fade"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <keep-alive :include="/.+/" :max="cacheMaxViewNumber">
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
import { defineComponent, provide, ref, watch } from "vue";
import appsetting from "@/config/app-setting";

export default defineComponent({
  name: "Home",
  setup() {
    const isCollapse = ref(false);
    const currentActive = ref("");
    const leftWidth = ref(appsetting.homeMenuOpenWidth);

    provide("currentActive", currentActive);
    provide("isCollapse", isCollapse);

    watch(isCollapse, (newvalue) => {
      leftWidth.value = newvalue
        ? appsetting.homeMenuShrinkWidth
        : appsetting.homeMenuOpenWidth;
    });

    return { leftWidth };
  },
  async beforeMount() {
    await this.$store.dispatch("LoadSourceHost");
  },
  computed: {
    isRouterActive: {
      get(): boolean {
        return this.$store.state.isRouterActive;
      },
      set(newValue: boolean): void {
        this.$store.commit("setIsRouterActive", newValue);
      }
    },
    cacheMaxViewNumber(): number {
      return this.$store.state.opendRouter.max;
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
}

aside {
  transition: width 0.3s ease-in-out;
  -webkit-transition: width 0.3s ease-in-out;
}

aside::-webkit-scrollbar {
  display: none;
}
</style>
