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
              @command="selectHeader"
              trigger="hover"
              placement="bottom-start"
              size="small"
            >
              <app-head-portrait :size="40"></app-head-portrait>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-menu">
                  <slot name="dropdown"></slot>
                  <el-dropdown-item command="adminlogin" icon="el-icon-user">
                    管理员登录
                  </el-dropdown-item>
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
import { reactive } from "vue";
import { defineComponent } from "vue";
import AppHeadPortrait from "./AppHeadPortrait.vue";

export default defineComponent({
  components: { AppHeadPortrait },
  name: "AppTopMenu",
  emits: ["select"],
  props: {
    title: { type: String, default: "" }
  },
  setup() {
    const dialogUserInfo = reactive({ show: false, formData: {} });
    return { dialogUserInfo };
  },
  methods: {
    logout(): void {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
    selectHeader(msg: string): void {
      switch (msg) {
        case "adminlogin":
          this.logout();
          break;
        default:
          this.$emit("select", msg);
          break;
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
