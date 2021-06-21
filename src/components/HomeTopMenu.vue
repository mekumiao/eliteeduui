<template>
  <div class="home-top-meun">
    <div class="menu">
      <div class="left">
        <i
          :class="
            isCollapse
              ? 'iconfont iconzhankai blackColor topButton'
              : 'iconfont iconshouqi blackColor topButton'
          "
          @click="isCollapse = !isCollapse"
        ></i>
        <i class="topButton" @click="onReload">
          <i
            @click="onReload"
            :class="
              isRouterActive ? 'el-icon-refresh-right' : 'el-icon-loading'
            "
          ></i>
        </i>
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          v-if="routeMap && routeMap.length > 0"
        >
          <el-breadcrumb-item v-for="(item, index) in routeMap" :key="index">
            <span class="myRouteTxt topTxtColor">{{ item.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <i
          :class="
            !isFull
              ? 'iconfont iconic_fullscreen topTxtColor topButton'
              : 'iconfont iconic_exitfullscreen topTxtColor topButton'
          "
          @click="collapseScreen"
        ></i>
        <i class="headPortrait">
          <el-dropdown
            @command="selectHeader"
            trigger="hover"
            placement="bottom-start"
          >
            <app-head-portrait
              :size="40"
              :img-url="portrait"
            ></app-head-portrait>
            <template #dropdown>
              <el-dropdown-menu class="dropdown-menu">
                <el-dropdown-item command="userinfo" icon="el-icon-user">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="password" icon="el-icon-lock">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item command="about" icon="el-icon-lock">
                  关于我们
                </el-dropdown-item>
                <el-dropdown-item
                  command="logout"
                  icon="el-icon-switch-button"
                  divided
                >
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, reactive, ref, defineComponent } from "vue";
import AppHeadPortrait from "./AppHeadPortrait.vue";
import fullScreen, { isFullScreen } from "@/utils/my-fullScreen";
import { getRouteMap } from "@/plugins/my-routeMap";
import { useStore } from "@/store";

export default defineComponent({
  components: { AppHeadPortrait },
  name: "HomeTopMenu",
  setup() {
    const isCollapse = inject("isCollapse", ref(false));
    const reload = inject<() => Promise<void>>("reload");
    const dialogUserInfo = reactive({ show: false, formData: {} });
    const portrait = ref(useStore().state.User?.Portrait);
    const isFull = ref(isFullScreen());
    const routeMap = getRouteMap(["/home/welcome"]);
    return { isCollapse, reload, dialogUserInfo, portrait, isFull, routeMap };
  },
  computed: {
    isRouterActive(): boolean {
      return this.$store.state.isRouterActive;
    }
  },
  methods: {
    async onReload(): Promise<void> {
      this.reload && (await this.reload());
    },
    async selectHeader(msg: string): Promise<void> {
      console.log(msg);
      switch (msg) {
        case "logout":
          this.$logoutConfirm();
          break;
        case "userinfo":
          this.$router.push("/home/myInformation");
          break;
        case "password":
          layer.msg("目前不能修改密码");
          break;
        case "about":
          this.$router.push("/home/about");
          break;
        default:
          layer.msg(`${msg}:该功能开发中`);
          break;
      }
      return Promise.resolve();
    },
    async collapseScreen(): Promise<void> {
      await fullScreen();
      this.isFull = isFullScreen();
    }
  }
});
</script>

<style lang="scss" scoped>
.home-top-meun {
  background-color: $top-menu-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;

  .menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #999;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      display: flex;
      align-items: center;

      .headPortrait {
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .headPortrait:hover {
        background-color: #f8f8f8;
      }
    }
  }
}

.dropdown-menu .el-dropdown-menu__item {
  font-size: 14px;
  width: 100px;
}

.topButton {
  height: 60px;
  width: 50px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
}

.topButton:hover {
  background-color: #f8f8f8;
}

.myRouteTxt {
  font-size: 13px;
}
</style>
