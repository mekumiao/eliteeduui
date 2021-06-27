<template>
  <div class="vip-reset-password">
    <vip-top-menu title="重置密码"></vip-top-menu>
    <div class="my-box">
      <el-card class="my-card">
        <my-reset-password @success="success"></my-reset-password>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VipResetPassword",
  setup() {
    return {};
  },
  methods: {
    success(account: string) {
      this.$router.push(`/vipLogin?account=${account}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.vip-reset-password {
  width: 100%;
  height: 100%;

  .my-box {
    position: relative;

    .my-card {
      width: 500px;
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
