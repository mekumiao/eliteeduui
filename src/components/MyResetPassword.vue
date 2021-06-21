<template>
  <el-form ref="form" :model="resetPassword" :rules="rolesResetPassword">
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
        <el-button :disabled="timmerTotal > 0" @click="sendCode">
          发送验证码{{ timmerTotal > 0 ? timmerTotal.toString() : "" }}
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
import { apiAuth, ResetPasswordByPhoneCodeInput } from "@/apis/adminAuthApi";
import useTimer from "@/hooks/useTimer";
import { sleep } from "@/utils/my-thread";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "MyResetPassword",
  emits: ["success"],
  setup() {
    const isLoging = ref(false);
    const resetPassword = reactive({} as ResetPasswordByPhoneCodeInput);
    return { isLoging, resetPassword };
  },
  mounted() {
    this.resetPassword.Phone = this.$store.state.User?.Phone ?? "";
  },
  methods: {
    async save(): Promise<void> {
      try {
        this.isLoging = true;
        await this.$useRules("form").validate();
        await sleep();
        this.$loading();
        const msg = await apiAuth.UserResetPasswordByVerificationCode(
          this.resetPassword
        );
        this.$message.showSuccess(msg);

        this.$emit("success");
      } finally {
        this.$closeLoading();
        this.isLoging = false;
      }
    },
    async sendCode(): Promise<void> {
      this.$useRules("form").validateField("Phone", async (error) => {
        if (!error) {
          useTimer.Start(60);
          await apiAuth.SendVerificationCode(this.resetPassword.Phone);
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped></style>
