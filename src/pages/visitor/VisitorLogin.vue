<template>
  <el-card>访客登录或注册</el-card>
  <el-card class="login-card">
    <el-form>
      <el-form-item label="手机号">
        <el-input v-model="phoneInput.Phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="phoneInput.Code"></el-input>
      </el-form-item>
      <el-form-item class="button">
        <el-button :disabled="timmerTotal > 0" @click="SendCode">
          发送验证码{{ timmerTotal > 0 ? timmerTotal.toString() : "" }}
        </el-button>
        <el-button type="primary" @click="Login" :loading="isLoging">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { PhoneCodeInput } from "@/apis/authApi";
import { defineComponent, ref } from "vue";
import useTimer from "@/hooks/useTimer";
import { apiAuth } from "@/apis/authApi";

export default defineComponent({
  name: "VisitorLogin",
  setup() {
    const timmerTotal = useTimer.Total;
    const phoneInput = ref<PhoneCodeInput>({} as PhoneCodeInput);
    const isLoging = ref(false);
    return { phoneInput, timmerTotal, isLoging };
  },
  methods: {
    /**访客登录 */
    async Login(): Promise<void> {
      try {
        this.isLoging = true;
        const token = await apiAuth.LoginOrRegisterAtVisitorByPhoneCode(
          this.phoneInput
        );
        window.localStorage.setItem("visitorToken", token.Token);
        this.$router.push("/visitorEliteSong");
      } finally {
        this.isLoging = false;
      }
    },
    async SendCode(): Promise<void> {
      await apiAuth.SendVerificationCodeAtVisitor(this.phoneInput.Phone);
      useTimer.Start(60);
    }
  }
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
  margin: 20px auto;
}
.button {
  text-align: right;
}
</style>
