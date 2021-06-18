<template>
  <app-top-menu title="登录或注册"></app-top-menu>
  <el-card class="login-card" v-if="!passwordLogin">
    <el-form
      :rules="rules"
      :model="phoneInput"
      ref="formLoginByCode"
      label-position="top"
    >
      <el-form-item label="名称" prop="Name">
        <el-input v-model="phoneInput.Name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="Phone">
        <el-input v-model="phoneInput.Phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="Code">
        <el-space>
          <el-input v-model="phoneInput.Code"></el-input>
          <el-button :disabled="timmerTotal > 0" @click="SendCode">
            发送验证码{{ timmerTotal > 0 ? timmerTotal.toString() : "" }}
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item>
        <el-button @click="passwordLogin = true">使用密码登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login" :loading="isLoging">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="login-card" v-else>
    <el-form
      :rules="rules"
      :model="loginInput"
      ref="formLoginByPassword"
      label-position="top"
    >
      <el-form-item label="手机号" prop="Account">
        <el-input v-model="loginInput.Account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="PassWord">
        <el-input v-model="loginInput.PassWord" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="passwordLogin = false">使用验证码登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login" :loading="isLoging">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { LoginInput, NamePhoneCodeInput } from "@/apis/adminAuthApi";
import { defineComponent, reactive, ref } from "vue";
import useTimer from "@/hooks/useTimer";
import { apiAuth } from "@/apis/adminAuthApi";
import AppTopMenu from "@/components/AppTopMenu.vue";
import { FormRule } from "@/types/el-rules";

const rulesCode = reactive({
  Phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { max: 40, message: "长度不能大于 40", trigger: "blur" }
  ] as FormRule[],
  Code: [
    { required: true, message: "验证码不能为空", trigger: "blur" }
  ] as FormRule[]
});

const rolesPassword = reactive({
  Phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { max: 40, message: "长度不能大于 40", trigger: "blur" }
  ] as FormRule[],
  PassWord: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 6 ~ 16 之间", trigger: "blur" }
  ] as FormRule[]
});

export default defineComponent({
  name: "VipLogin",
  components: { AppTopMenu },
  setup() {
    const passwordLogin = ref(false);
    const timmerTotal = useTimer.Total;
    const phoneInput = reactive<NamePhoneCodeInput>({} as NamePhoneCodeInput);
    const loginInput = reactive<LoginInput>({} as LoginInput);
    const isLoging = ref(false);
    return {
      passwordLogin,
      phoneInput,
      loginInput,
      timmerTotal,
      isLoging,
      rulesCode,
      rolesPassword
    };
  },
  methods: {
    /**VIP登录 */
    async Login(): Promise<void> {
      try {
        this.isLoging = true;
        if (this.passwordLogin) {
          await this.$useRules("formLoginByPassword").validate();
          const token = await apiAuth.VipLoginOrRegisterByAccountCode(
            this.loginInput
          );
          window.localStorage.setItem("vipToken", token.Token);
        } else {
          await this.$useRules("formLoginByCode").validate();
          const token = await apiAuth.VipLoginOrRegisterByPhoneCode(
            this.phoneInput
          );
          window.localStorage.setItem("vipToken", token.Token);
        }
        this.$router.push("/vipCourseware");
      } finally {
        this.isLoging = false;
      }
    },
    async SendCode(): Promise<void> {
      this.$useRules("formLoginByCode").validateField(
        "Phone",
        async (error) => {
          if (!error) {
            useTimer.Start(60);
            await apiAuth.VipSendVerificationCode(this.phoneInput.Phone);
          }
        }
      );
    }
  }
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
  margin: 20px auto;
}
</style>
