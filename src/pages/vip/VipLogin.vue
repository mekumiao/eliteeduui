<template>
  <div class="vip-login">
    <vip-top-menu title="VIP登录" :show-menu="false"></vip-top-menu>
    <div class="my-box">
      <div class="my-card">
        <el-card v-show="!passwordLogin">
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
                <el-button :disabled="timerTotal > 0" @click="sendCode">
                  发送验证码{{ timerTotal > 0 ? timerTotal.toString() : "" }}
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
        <el-card v-show="passwordLogin">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginInput, NamePhoneCodeInput } from "@/apis/adminAuthApi";
import { defineComponent, reactive, ref } from "vue";
import { Timer } from "@/hooks/useTimer";
import { apiAuth } from "@/apis/adminAuthApi";
import { decodeAccessToken } from "@/utils/my-token";
import { useRoute } from "vue-router";

const rulesCode = reactive({
  Phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { max: 11, message: "长度不能大于 11", trigger: "blur" }
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
  setup() {
    const passwordLogin = ref(true);
    const timer = new Timer();
    const timerTotal = timer.Total;
    const phoneInput = reactive<NamePhoneCodeInput>({} as NamePhoneCodeInput);
    const loginInput = reactive<LoginInput>({} as LoginInput);
    const account = useRoute().query.account as string;
    if (account) {
      phoneInput.Phone = account;
      loginInput.Account = account;
    }
    const isLoging = ref(false);
    return {
      timer,
      timerTotal,
      passwordLogin,
      phoneInput,
      loginInput,
      isLoging,
      rulesCode,
      rolesPassword
    };
  },
  methods: {
    /**VIP登录 */
    async Login(): Promise<void> {
      try {
        if (this.passwordLogin) {
          await this.$useRules("formLoginByPassword").validate();
          this.$nprogress.start();
          this.isLoging = true;
          const token = await apiAuth.GetToken(this.loginInput);
          this.setToken(token.Token);
        } else {
          await this.$useRules("formLoginByCode").validate();
          this.$nprogress.start();
          this.isLoging = true;
          const token = await apiAuth.VipLoginOrRegisterByPhoneCode(
            this.phoneInput
          );
          this.setToken(token.Token);
        }
      } finally {
        this.isLoging = false;
        this.$nprogress.done();
      }
    },
    async sendCode(): Promise<void> {
      this.$useRules("formLoginByCode").validateField(
        "Phone",
        async (error) => {
          if (!error) {
            try {
              this.timer.Start(60);
              await apiAuth.SendVerificationCode(this.phoneInput.Phone);
            } catch (error) {
              console.error(error);
            }
          }
        }
      );
    },
    setToken(token: string): void {
      const user = decodeAccessToken(token);
      const superRoles = user?.role.filter((x) => x === "vip") ?? [];
      if (superRoles.length > 0) {
        this.$store.commit("resetState");
        this.$store.commit("setAccessToken", token);
        this.$router.push("/vipCourseware");
      } else {
        this.$message.showError("您不是vip用户,不能通过该方式登录");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.vip-login {
  width: 100%;
  height: 100%;

  .my-box {
    position: relative;

    .my-card {
      width: 400px;
      position: absolute;
      padding: 30px;
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
