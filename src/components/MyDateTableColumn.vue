<template>
  <el-table-column
    min-width="100px"
    :label="label"
    :prop="prop"
    :formatter="myFormater"
  ></el-table-column>
</template>
<script lang="ts">
import ElFormatter, { ElCol } from "@/utils/el-column-formatter";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MyDateTableColumn",
  props: {
    label: { type: String as PropType<string>, required: true },
    prop: { type: String as PropType<string>, required: true },
    short: { type: Boolean as PropType<boolean>, default: true },
    formate: { type: String as PropType<string>, default: "" }
  },
  setup() {
    return {};
  },
  methods: {
    myFormater(row: Record<string, unknown>, col: ElCol, cellValue: unknown) {
      const { dateFormatter, dateTimeFormatter } = ElFormatter;
      if (this.short) {
        return dateFormatter(row, col, cellValue);
      } else {
        return dateTimeFormatter(row, col, cellValue);
      }
    }
  }
});
</script>
