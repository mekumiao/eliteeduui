<template>
  <el-form ref="form" :model="updPassword" :rules="rolesUpdPassword">
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
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { apiAdminAuth, PasswordUpdInput } from "@/apis/adminAuthApi";
import { sleep } from "@/utils/my-thread";
import { defineComponent, reactive, ref } from "vue";

const rolesUpdPassword = reactive({});
const rolesResetPassword = reactive({});

export default defineComponent({
  name: "MyUpdPassword",
  emits: ["success"],
  setup() {
    const isLoging = ref(false);
    const updPassword = reactive({} as PasswordUpdInput);
    return {
      isLoging,
      updPassword,
      rolesUpdPassword,
      rolesResetPassword
    };
  },
  methods: {
    async save() {
      try {
        this.isLoging = true;
        await this.$useRules("form").validate();
        await sleep();
        this.$loading();
        const msg = await apiAdminAuth.UserUpdatePasswordByOldPassword(
          this.updPassword
        );
        this.$message.showSuccess(msg);
        this.$emit("success", this.updPassword.Account);
      } finally {
        this.$closeLoading();
        this.isLoging = false;
      }
    }
  }
});
</script>
