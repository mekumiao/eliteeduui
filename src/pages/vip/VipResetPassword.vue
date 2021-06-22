<template>
  <vip-top-menu title="重置密码"></vip-top-menu>
  <el-card class="vip-reset-password">
    <my-reset-password @success="success"></my-reset-password>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyResetPassword from "@/components/MyResetPassword.vue";
import VipTopMenu from "@/components/VipTopMenu.vue";

export default defineComponent({
  name: "VipResetPassword",
  components: { VipTopMenu, MyResetPassword },
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
  width: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
