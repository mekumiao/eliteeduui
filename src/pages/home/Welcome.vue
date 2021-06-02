<template>
  <div class="welcome">
    <h6>
      <el-space>
        <span>{{ msg }}</span>
      </el-space>
    </h6>
    <el-card>
      <img src="@/assets/logo.png" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import appsetting from "@/config/app-setting";

export default defineComponent({
  name: "Welcome",
  props: {
    msg: {
      type: String as PropType<string>,
      default: `欢迎来到${appsetting.systemName}`
    }
  }
});
</script>

<style lang="scss" scoped>
.welcome {
  width: 95%;
  height: 95%;
}
</style>
