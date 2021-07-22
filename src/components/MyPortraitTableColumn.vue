<template>
  <el-table-column :label="label">
    <template #default="scope">
      <app-portrait :img-url="scope.row[prop]" :size="40"></app-portrait>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MyPortraitTableColumn",
  props: {
    label: { type: String as PropType<string>, default: "头像" },
    prop: { type: String as PropType<string>, default: "Portrait" }
  },
  setup() {
    return {};
  }
});
</script>
