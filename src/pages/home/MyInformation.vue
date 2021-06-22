<template>
  <div class="my-information">
    <el-card>
      <el-descriptions title="个人信息" :column="2" size="medium">
        <template #extra>
          <el-button type="primary">操作</el-button>
        </template>
        <el-descriptions-item label="姓名">
          {{ formData.name }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
          {{ formData.nickname }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ formData.gender }}
        </el-descriptions-item>
        <el-descriptions-item label="出生日期">
          {{ formData.birthdate }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyInformation",
  setup() {
    const formData = ref({});
    formData.value = useStore().state.user ?? {};
    return { formData };
  }
});
</script>

<style lang="scss" scoped></style>
