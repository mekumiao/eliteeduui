<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <el-table-column
    label="创建用户"
    prop="CreateUserName"
    min-width="80"
    align="center"
    :formatter="emptyFormatter"
  />
  <el-table-column
    label="创建时间"
    sortable="custom"
    prop="CreateTime"
    min-width="135"
    align="center"
    :formatter="dateTimeFormatter"
  />
  <el-table-column
    label="修改用户"
    prop="UpdateUserName"
    min-width="80"
    align="center"
    :formatter="emptyFormatter"
  />
  <el-table-column
    label="修改时间"
    sortable="custom"
    prop="UpdateTime"
    min-width="135"
    align="center"
    :formatter="dateTimeFormatter"
  />
</template>

<script lang="ts">
import ElFormatter from "@/utils/el-column-formatter";
import { defineComponent } from "vue";

/**表格视图列组件(包含常用的列) */
export default defineComponent({
  name: "MyPageTableColumnBase",
  setup() {
    const { dateTimeFormatter, emptyFormatter } = ElFormatter;
    return { dateTimeFormatter, emptyFormatter };
  }
});
</script>
