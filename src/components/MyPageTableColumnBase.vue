<template>
  <el-table-column
    label="创建用户"
    prop="createusername"
    :formatter="formatter.emptyFormatter"
  />
  <el-table-column
    label="创建时间"
    sortable="custom"
    prop="createtime"
    :formatter="formatter.dateFormatter"
  />
  <el-table-column
    label="修改用户"
    prop="updateusername"
    :formatter="formatter.emptyFormatter"
  />
  <el-table-column
    label="修改时间"
    sortable="custom"
    prop="updatetime"
    :formatter="formatter.dateFormatter"
  />
</template>

<script lang="ts">
import ElFormatter from "@/utils/el-column-formatter";
import { defineComponent, reactive } from "vue";

/**表格视图列组件(包含常用的列) */
export default defineComponent({
  name: "MyPageTableColumnBase",
  setup() {
    const formatter = reactive(ElFormatter);
    return { formatter };
  }
});
</script>
