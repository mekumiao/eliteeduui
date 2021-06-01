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
            >
              <app-head-portrait :size="40"></app-head-portrait>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-menu">
                  <slot name="dropdown"></slot>
                  <el-dropdown-item>关于我们</el-dropdown-item>
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
    selectHeader(msg: string) {
      this.$emit("select", msg);
    }
  }
});
</script>

<style lang="scss" scoped>
.app-top-meun {
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

.dropdown-menu .el-dropdown-menu__item {
  font-size: 14px;
  width: 100px;
}
</style>
