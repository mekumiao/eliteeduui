<template>
  <app-top-menu title="修改密码"></app-top-menu>
  <el-card class="vip-upd-password">
    <my-upd-password @success="success"></my-upd-password>
  </el-card>
</template>

<script lang="ts">
import MyUpdPassword from "@/components/MyUpdPassword.vue";
import AppTopMenu from "@/components/VipTopMenu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppTopMenu, MyUpdPassword },
  setup() {
    return {};
  },
  methods: {
    success() {
      this.$router.push("/vipLogin");
    }
  }
});
</script>

<style lang="scss" scoped>
.vip-upd-password {
  width: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
