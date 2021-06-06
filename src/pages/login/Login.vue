<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <app-head-portrait :img-url="refImgUrl" :size="180"></app-head-portrait>
      </div>
      <el-form
        class="login_form"
        label-width="0"
        :model="refLoginInput"
        :rules="refRules"
        ref="loginFormRef"
      >
        <el-form-item prop="Account">
          <el-input
            size="medium"
            prefix-icon="iconfont yonghu"
            type="text"
            v-model="refLoginInput.Account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PassWord">
          <el-input
            size="medium"
            prefix-icon="iconfont suo1"
            type="password"
            autocomplete="off"
            v-model="refLoginInput.PassWord"
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
import { defineComponent, Ref, ref } from "vue";
import { apiAuth, LoginInput } from "@/apis/adminAuthApi";
import { FormRule } from "@/types/el-rules";
import AppHeadPortrait from "@/components/AppHeadPortrait.vue";

declare interface DataRules {
  Account: FormRule[];
  PassWord: FormRule[];
}

export default defineComponent({
  components: { AppHeadPortrait },
  name: "Login",
  setup() {
    const refImgUrl = ref("");
    const refLoginInput = ref({
      Account: "admin",
      PassWord: "123123"
    }) as Ref<LoginInput>;

    const rules = {
      Account: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 - 10 之间", trigger: "blur" }
      ],
      PassWord: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 10, message: "长度在 6 - 16 之间", trigger: "blur" }
      ]
    } as DataRules;

    const refRules = ref(rules);
    const loginLoading = ref(false);

    return { refImgUrl, refLoginInput, refRules, loginLoading };
  },
  methods: {
    async login(): Promise<void> {
      try {
        await this.$useRules("loginFormRef").validate();
        this.loginLoading = true;
        this.$nprogress.start();
        const token = await apiAuth.Token({
          Account: this.refLoginInput.Account,
          PassWord: this.refLoginInput.PassWord
        });
        window.localStorage.setItem("token", token.Token);
        window.sessionStorage.setItem("state", "5200");

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
  background-color: #2b4b6b;
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
