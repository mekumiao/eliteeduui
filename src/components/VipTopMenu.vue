<template>
  <div class="app-top-meun">
    <div class="menu">
      <div class="left">
        <span>{{ title }}</span>
      </div>
      <div class="right">
        <el-space>
          <i>
            <el-dropdown
              @command="select"
              trigger="hover"
              placement="bottom-start"
              size="small"
            >
              <app-head-portrait :size="40"></app-head-portrait>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-menu">
                  <el-dropdown-item
                    command="resetPassword"
                    icon="el-icon-edit-outline"
                  >
                    重置密码
                  </el-dropdown-item>
                  <el-dropdown-item command="updPassword" icon="el-icon-edit">
                    修改密码
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="logout"
                    icon="el-icon-switch-button"
                  >
                    重新登录
                  </el-dropdown-item>
                  <!-- <el-dropdown-item
                    command="adminlogin"
                    icon="el-icon-user"
                    divided
                  >
                    管理员登录
                  </el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </i>
        </el-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { sleep } from "@/utils/my-thread";
import { reactive } from "vue";
import { defineComponent } from "vue";
import AppHeadPortrait from "./AppHeadPortrait.vue";

export default defineComponent({
  components: { AppHeadPortrait },
  name: "AppTopMenu",
  props: {
    title: { type: String, default: "" },
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const dialogUserInfo = reactive({ show: false, formData: {} });
    return { dialogUserInfo };
  },
  methods: {
    async logout(): Promise<void> {
      try {
        this.$loading();
        await sleep(500);
        this.$store.commit("resetState");
        this.$router.push("/login");
      } finally {
        this.$closeLoading();
      }
    },
    async select(tag: string) {
      if (tag === "adminlogin") {
        this.$router.push("/login");
      } else if (tag === "logout") {
        this.$logoutConfirm("/vipLogin");
      } else if (tag === "password") {
        this.$router.push("/vipUpdPassword");
      } else if (tag === "updPassword") {
        this.$router.push("/vipUpdPassword");
      } else if (tag === "resetPassword") {
        this.$router.push("/vipResetPassword");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.app-top-meun {
  background-color: #14151c;
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

      span {
        padding-left: 10px;
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
</style>
