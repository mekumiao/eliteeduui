<template>
  <el-form
    v-if="isUpdPassword"
    ref="formUpdPassword"
    :model="updPassword"
    :rules="rolesUpdPassword"
  >
    <el-form-item label="账号" prop="Account">
      <el-input
        type="text"
        v-model="updPassword.Account"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="原密码" prop="OldPassWord">
      <el-input
        type="password"
        v-model="updPassword.OldPassWord"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="PassWord">
      <el-input
        type="password"
        v-model="updPassword.PassWord"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="save" type="primary" :loading="isLoging">
        修改密码
      </el-button>
      <el-button
        @click="isUpdPassword = !isUpdPassword"
        type="text"
        :loading="isLoging"
      >
        忘记密码
      </el-button>
    </el-form-item>
  </el-form>
  <el-form
    v-else
    ref="formResetPassword"
    :model="resetPassword"
    :rules="rolesResetPassword"
  >
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
        <el-button :disabled="timmerTotal > 0" @click="SendCode">
          发送验证码{{ timmerTotal > 0 ? timmerTotal.toString() : "" }}
        </el-button>
      </el-space>
    </el-form-item>
    <el-form-item>
      <el-button @click="save" type="primary" :loading="isLoging">
        重置密码
      </el-button>
      <el-button
        type="text"
        @click="isUpdPassword = !isUpdPassword"
        :loading="isLoging"
      >
        密码修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  apiAuth,
  PasswordUpdInput,
  ResetPasswordByPhoneCodeInput
} from "@/apis/adminAuthApi";
import useTimer from "@/hooks/useTimer";
import { defineComponent, reactive, ref } from "vue";

const rolesUpdPassword = reactive({});
const rolesResetPassword = reactive({});

export default defineComponent({
  name: "MyUpdPassword",
  setup() {
    const timmerTotal = useTimer.Total;
    const isUpdPassword = ref(true);
    const isLoging = ref(false);
    const updPassword = reactive({} as PasswordUpdInput);
    const resetPassword = reactive({} as ResetPasswordByPhoneCodeInput);
    return {
      timmerTotal,
      isUpdPassword,
      isLoging,
      updPassword,
      resetPassword,
      rolesUpdPassword,
      rolesResetPassword
    };
  },
  mounted() {
    this.resetPassword.Phone = this.$store.state.User?.Phone ?? "";
    this.updPassword.Account = this.$store.state.User?.Phone ?? "";
  },
  methods: {
    async save(colse: () => void) {
      if (this.isUpdPassword) {
        await this.$useRules("formUpdPassword").validate();
        colse();
      } else {
        await this.$useRules("formResetPassword").validate();
        colse();
      }
    },
    async SendCode(): Promise<void> {
      this.$useRules("formResetPassword").validateField(
        "Phone",
        async (error) => {
          if (!error) {
            useTimer.Start(60);
            await apiAuth.SendVerificationCode(this.resetPassword.Phone);
          }
        }
      );
    }
  }
});
</script>
