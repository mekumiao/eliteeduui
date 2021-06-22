<template>
  <div class="my-login">
    <div class="box">
      <h2>{{ systemName }}</h2>
      <el-form ref="loginForm" label-width="0" :model="authData" :rules="rules">
        <el-form-item prop="Account">
          <el-input
            ref="accountRef"
            size="medium"
            prefix-icon="iconfont iconuser-line"
            type="text"
            placeholder="请输入账号"
            v-model="authData.Account"
            @keypress.enter.stop="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PassWord">
          <el-input
            size="medium"
            prefix-icon="iconfont iconsuo2"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            v-model="authData.PassWord"
            @keypress.enter.stop="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button plain size="medium" :loading="loginLoading" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { apiAuth, LoginInput } from "@/apis/adminAuthApi";
import { defineComponent, reactive, ref } from "vue";
import setting from "@/config/app-setting";
import { FormRule } from "@/types/el-rules";
import { sleep } from "@/utils/my-thread";
import { decodeAccessToken } from "@/utils/my-token";

interface DataRules {
  Account: FormRule[];
  PassWord: FormRule[];
}

const rules = reactive<DataRules>({
  Account: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 - 20 之间", trigger: "blur" }
  ],
  PassWord: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 6 - 16 之间", trigger: "blur" }
  ]
});

export default defineComponent({
  setup() {
    const accountRef = ref<HTMLElement | undefined>(undefined);
    const systemName = ref(setting.systemName);
    const loginLoading = ref(false);
    const authData = reactive<LoginInput>({
      Account:
        process.env.NODE_ENV === "development" ? setting.authData.account : "",
      PassWord:
        process.env.NODE_ENV === "development" ? setting.authData.passWord : ""
    });

    return {
      accountRef,
      systemName,
      authData,
      rules,
      loginLoading
    };
  },
  mounted() {
    this.accountRef?.focus();
  },
  methods: {
    async login(): Promise<void> {
      try {
        await this.$useRules("loginForm").validate();
        this.$nprogress.start();
        this.loginLoading = true;
        const token = await apiAuth.GetToken({
          Account: this.authData.Account,
          PassWord: this.authData.PassWord
        });
        const user = decodeAccessToken(token.Token);
        const isSuccess =
          user?.role.filter(
            (x) => x === "system" || x === "admin" || x === "teacher"
          ) ?? [];
        if (isSuccess.length > 0) {
          this.$store.commit("resetState");
          this.$store.commit("setAccessToken", token.Token);
          await sleep(500);
          this.$router.push("/");
          this.$message.closeAll();
        } else {
          this.$message.showError("您没有权限登录后台系统");
        }
      } catch (error) {
        this.$message.showError(error);
      } finally {
        this.loginLoading = false;
        this.$nprogress.done();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.my-login {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url(~@/assets/img/library.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  filter: brightness(0.9);
  -webkit-filter: brightness(0.9);
  -o-filter: brightness(0.9);
  -moz-filter: brightness(0.9);
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
</style>

<style lang="scss">
.my-login {
  .box {
    input {
      color: white;
    }
    .el-input__inner {
      background: transparent;
    }
    .submit-btn {
      display: flex;

      .el-form-item__content,
      button.el-button {
        color: white;
        font-weight: bolder;
        font-size: 14px;
        width: 100%;
        background: rgba(99, 82, 82, 0.158);
      }
      button.el-button:hover {
        color: #409eff;
      }
    }
  }
}
</style>
