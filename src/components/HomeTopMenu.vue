<template>
  <div class="home-top-meun">
    <div class="menu">
      <div class="left">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="isCollapse = !isCollapse"
        ></i>
        <i @click="onReload" class="el-icon-refresh-right"></i>
      </div>
      <div class="right">
        <el-space>
          <i class="el-icon-full-screen" @click="collapseScreen"></i>
          <i>
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
                    用户信息
                  </el-dropdown-item>
                  <el-dropdown-item command="password" icon="el-icon-lock">
                    修改密码
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
        </el-space>
      </div>
    </div>
  </div>

  <el-dialog title="用户信息" v-model="dialogUserInfo.show" width="30%">
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="PID" prop="pid">
        <span>{{ dialogUserInfo.formData.pid }}</span>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <span>{{ dialogUserInfo.formData.username }}</span>
      </el-form-item>
      <el-form-item label="性别" prop="rolename">
        <span>{{ dialogUserInfo.formData.gender === 0 ? "男" : "女" }}</span>
      </el-form-item>
      <el-form-item label="年龄" prop="rolename">
        <span>{{ dialogUserInfo.formData.age || 18 }}</span>
      </el-form-item>
      <el-form-item label="生日" prop="rolename">
        <time>{{ dialogUserInfo.formData.birthday || "--" }}</time>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogUserInfo.show = false">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { UserInfoOutput } from "@/apis/adminUserInfoApi";
import { inject, reactive, ref, defineComponent } from "vue";
import AppHeadPortrait from "./AppHeadPortrait.vue";
import { exitScreen, fullScreen } from "@/utils/my-fullScreen";

export default defineComponent({
  components: { AppHeadPortrait },
  name: "HomeTopMenu",
  setup() {
    const isCollapse = inject("isCollapse", ref(false));
    const isFullScreen = ref(false);
    const reload = inject<() => Promise<void>>("reload");
    const dialogUserInfo = reactive({ show: false, formData: {} });
    const msg = window.localStorage.getItem("user");
    const user = JSON.parse(msg ?? "{}") as UserInfoOutput;
    const portrait = ref(user?.Portrait);
    return { isCollapse, isFullScreen, reload, dialogUserInfo, portrait };
  },
  methods: {
    logout(): void {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      this.$router.push("/login");
    },
    async onReload(): Promise<void> {
      this.reload && (await this.reload());
    },
    async selectHeader(msg: string): Promise<void> {
      console.log(msg);
      switch (msg) {
        case "logout":
          this.logout();
          break;
        default:
          break;
      }
      return Promise.resolve();
    },
    collapseScreen(): void {
      debugger;
      if (this.isFullScreen === false) {
        fullScreen();
        this.isFullScreen = true;
      } else {
        exitScreen();
        this.isFullScreen = false;
      }
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
    color: #fff;

    .left {
      display: flex;
      align-items: center;

      i {
        padding-right: 10px;
        font-size: 20px;
      }
    }

    .right {
      display: flex;
      align-items: center;

      i {
        padding-right: 10px;
        font-size: 20px;
      }
    }
  }
}

.dropdown-menu .el-dropdown-menu__item {
  font-size: 14px;
  width: 100px;
}
</style>
