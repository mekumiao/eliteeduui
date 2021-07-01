<template>
  <el-form ref="form" :model="resetPassword">
    <el-form-item label="手机号" prop="Phone">
      <el-input v-model="resetPassword.Phone"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="PassWord">
      <el-input
        type="text"
        v-model="resetPassword.PassWord"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="Code">
      <el-space>
        <el-input
          type="text"
          v-model="resetPassword.Code"
          autocomplete="off"
        ></el-input>
        <el-button :disabled="timerTotal > 0" @click="sendCode">
          发送验证码{{ timerTotal > 0 ? timerTotal.toString() : "" }}
        </el-button>
      </el-space>
    </el-form-item>
    <el-form-item>
      <el-button @click="save" type="primary" :loading="isLoging">
        重置密码
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  apiAdminAuth,
  ResetPasswordByPhoneCodeInput
} from "@/apis/adminAuthApi";
import { TimerDown } from "@/hooks/useTimer";
import { sleep } from "@/utils/my-thread";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "MyResetPassword",
  emits: ["success"],
  setup() {
    const isLoging = ref(false);
    const timerDown = new TimerDown();
    const timerTotal = timerDown.Total;
    const resetPassword = reactive({} as ResetPasswordByPhoneCodeInput);
    return { isLoging, timerDown, timerTotal, resetPassword };
  },
  methods: {
    async save(): Promise<void> {
      try {
        this.isLoging = true;
        await this.$useRules("form").validate();
        await sleep();
        this.$loading();
        const msg = await apiAdminAuth.UserResetPasswordByVerificationCode(
          this.resetPassword
        );
        this.$message.showSuccess(msg);
        this.$emit("success", this.resetPassword.Phone);
      } finally {
        this.$closeLoading();
        this.isLoging = false;
      }
    },
    async sendCode(): Promise<void> {
      this.$useRules("form").validateField("Phone", async (error) => {
        if (!error) {
          this.timerDown.Start(60);
          await apiAdminAuth.SendVerificationCodeByResetPassword(
            this.resetPassword.Phone
          );
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped></style>
