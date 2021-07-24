<template>
  <el-table-column fixed="right" align="left" :width="width">
    <template #header>
      <el-input
        :model-value="modelValue"
        size="mini"
        placeholder="输入关键字搜索"
        @keyup.enter="$emit('search')"
        @input="$emit('update:modelValue', $event)"
      >
        <template #append>
          <el-button
            icon="el-icon-search"
            size="mini"
            @click="$emit('search')"
          ></el-button>
        </template>
      </el-input>
    </template>
    <template #default="scope">
      <slot v-bind="{ row: scope.row, $index: scope.$index }" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

/**表格搜索列组件 */
export default defineComponent({
  name: "MyPageTableColumnSearch",
  emits: ["update:modelValue", "search"],
  props: {
    fixed: {
      type: [Boolean] as PropType<boolean>,
      default: true
    },
    width: { type: [Number, String], default: 190 },
    modelValue: { type: String, default: "" }
  }
});
</script>
