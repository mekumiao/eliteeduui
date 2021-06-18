<template>
  <app-top-menu title="登录或注册"></app-top-menu>
  <el-card class="login-card" v-if="!passwordLogin">
    <el-form
      ref="formLoginByCode"
      label-width="0"
      :rules="rulesCode"
      :model="phoneInput"
    >
      <el-form-item prop="Name">
        <el-input
          size="medium"
          placeholder="请输入名称"
          prefix-icon="el-icon-user"
          type="text"
          v-model="phoneInput.Name"
        ></el-input>
      </el-form-item>
      <el-form-item prop="Phone">
        <el-input
          size="medium"
          placeholder="请输入手机号"
          prefix-icon="el-icon-mobile"
          type="text"
          v-model="phoneInput.Phone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="Code">
        <el-space>
          <el-input
            placeholder="验证码"
            type="text"
            autocomplete="off"
            v-model="phoneInput.Code"
          ></el-input>
          <el-button :disabled="timmerTotal > 0" @click="SendCode">
            发送验证码{{ timmerTotal > 0 ? timmerTotal.toString() : "" }}
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login" :loading="isLoging">
          注册或登录
        </el-button>
        <el-button @click="passwordLogin = true" type="text">
          密码登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="login-card" v-else>
    <el-form
      ref="formLoginByPassword"
      label-width="0"
      :rules="rolesPassword"
      :model="loginInput"
    >
      <el-form-item prop="Account">
        <el-input
          size="medium"
          prefix-icon="iconfont iconuser-line"
          type="text"
          placeholder="请输入手机号"
          v-model="loginInput.Account"
        ></el-input>
      </el-form-item>
      <el-form-item prop="PassWord">
        <el-input
          size="medium"
          prefix-icon="iconfont iconsuo2"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          v-model="loginInput.PassWord"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login" :loading="isLoging">
          立即登录
        </el-button>
        <el-button @click="passwordLogin = false" type="text">
          验证码登录
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
  Account: [
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
    const passwordLogin = ref(true);
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
  padding: 30px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
