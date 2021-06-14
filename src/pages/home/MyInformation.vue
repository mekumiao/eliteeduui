<template>
  <div class="my-information">
    <el-card>
      <el-descriptions title="个人信息" :column="2" size="medium">
        <template #extra>
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item label="姓名">
          {{ formData.FullName }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
          {{ formData.NickName }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ formData.Gender }}
        </el-descriptions-item>
        <el-descriptions-item label="出生日期">
          {{ formData.Birthday }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
import { UserInfoOutput } from "@/apis/adminUserInfoApi";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyInformation",
  setup() {
    const jsonData = window.localStorage.getItem("user") ?? "{}";
    const user: UserInfoOutput = JSON.parse(jsonData);
    const formData = ref({});
    formData.value = user;
    return { formData };
  }
});
</script>

<style lang="scss" scoped></style>
