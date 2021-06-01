<template>
  <app-top-menu title="登录或注册"></app-top-menu>
  <el-card class="login-card">
    <el-form
      :rules="rules"
      :model="phoneInput"
      ref="formLogin"
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
        <el-button type="primary" @click="Login" :loading="isLoging">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { NamePhoneCodeInput } from "@/apis/authApi";
import { defineComponent, reactive, ref } from "vue";
import useTimer from "@/hooks/useTimer";
import { apiAuth } from "@/apis/authApi";
import AppTopMenu from "@/components/AppTopMenu.vue";
import { FormRule } from "@/types/el-rules";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Phone: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Code: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[]
});

export default defineComponent({
  components: { AppTopMenu },
  name: "VisitorLogin",
  setup() {
    const timmerTotal = useTimer.Total;
    const phoneInput = ref<NamePhoneCodeInput>({} as NamePhoneCodeInput);
    const isLoging = ref(false);
    return { phoneInput, timmerTotal, isLoging, rules };
  },
  methods: {
    /**访客登录 */
    async Login(): Promise<void> {
      try {
        await this.$useRules("formLogin").validate();
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
      this.$useRules("formLogin").validateField("Phone", async (error) => {
        if (!error) {
          useTimer.Start(60);
          await apiAuth.SendVerificationCodeAtVisitor(this.phoneInput.Phone);
        }
      });
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
