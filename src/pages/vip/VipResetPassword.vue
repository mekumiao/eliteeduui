<template>
  <vip-top-menu title="重置密码"></vip-top-menu>
  <el-card class="vip-reset-password">
    <my-reset-password></my-reset-password>
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
  }
});
</script>
