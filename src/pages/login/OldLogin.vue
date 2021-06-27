<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <app-head-portrait :img-url="imgUrl" :size="180"></app-head-portrait>
      </div>
      <el-form
        class="login_form"
        label-width="0"
        :model="authData"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item prop="Account">
          <el-input
            size="medium"
            prefix-icon="iconfont iconyonghu"
            type="text"
            placeholder="请输入账号"
            v-model="authData.Account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PassWord">
          <el-input
            size="medium"
            prefix-icon="iconfont iconsuo"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            v-model="authData.PassWord"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            size="medium"
            type="primary"
            :loading="loginLoading"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { apiAuth, LoginInput } from "@/apis/adminAuthApi";
import { FormRule } from "@/types/el-rules";
import AppHeadPortrait from "@/components/AppPortrait.vue";
import { apiUserInfo } from "@/apis/adminUserInfoApi";
import { sleep } from "@/utils/my-thread";
import setting from "@/config/app-setting";

interface DataRules {
  Account: FormRule[];
  PassWord: FormRule[];
}

const rules = reactive<DataRules>({
  Account: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 - 10 之间", trigger: "blur" }
  ],
  PassWord: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 10, message: "长度在 6 - 16 之间", trigger: "blur" }
  ]
});

export default defineComponent({
  components: { AppHeadPortrait },
  name: "Login",
  setup() {
    const imgUrl = ref("");
    const loginLoading = ref(false);
    const authData = reactive<LoginInput>({
      Account:
        process.env.NODE_ENV === "development" ? setting.authData.account : "",
      PassWord:
        process.env.NODE_ENV === "development" ? setting.authData.passWord : ""
    });

    return { imgUrl, authData, rules, loginLoading };
  },
  methods: {
    async login(): Promise<void> {
      try {
        await this.$useRules("loginForm").validate();
        this.loginLoading = true;
        this.$nprogress.start();
        const token = await apiAuth.GetToken({
          Account: this.authData.Account,
          PassWord: this.authData.PassWord
        });
        window.localStorage.setItem("token", token.Token);
        window.sessionStorage.setItem("state", "5200");
        const user = await apiUserInfo.GetCurrentUserInfo();
        window.localStorage.setItem("user", JSON.stringify(user));
        this.imgUrl = user.Portrait;
        await sleep();
        this.$router.push("/");
        this.$message.closeAll();
      } finally {
        this.loginLoading = false;
        this.$nprogress.done();
      }
      this.loginLoading = false;
      this.$nprogress.done();
    }
  }
});
</script>

<style lang="scss">
.login {
  background-color: #f6f7f9;
  min-height: 100%;
  height: 100%;

  .login_box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    -webkit-box-shadow: 0px 0px 10px rgba(26, 69, 168, 0.1);
    box-shadow: 0px 0px 10px rgba(26, 69, 168, 0.1);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .login_form {
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}

.login .login_form .btns {
  display: flex;

  .el-form-item__content,
  button.el-button {
    width: 100%;
  }
}
</style>
