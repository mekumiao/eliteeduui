<template>
  <el-table-column :label="label">
    <template #default="scope">
      <el-tag v-if="scope.row[prop] === 0" effect="dark">男</el-tag>
      <el-tag v-else-if="scope.row[prop] === 1" type="danger" effect="dark">
        女
      </el-tag>
      <el-tag v-else>其他</el-tag>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MyGenderTableColumn",
  props: {
    label: { type: String as PropType<string>, default: "性别" },
    prop: { type: String as PropType<string>, default: "Gender" }
  },
  setup() {
    return {};
  }
});
</script>
