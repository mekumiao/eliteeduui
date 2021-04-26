<template>
  <el-dialog
    destroy-on-close
    :title="title"
    :model-value="modelValue"
    :width="width"
    @close="$emit('update:modelValue', false)"
  >
    <slot :data="formData"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">取 消</el-button>
        <el-button type="primary" @click="save"> 保 存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AppDialog",
  emits: ["save", "update:modelValue"],
  props: {
    title: { type: String as PropType<string>, default: "标题" },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "30%"
    },
    modelValue: { type: Boolean as PropType<boolean>, default: false },
    formData: { type: Object as PropType<unknown>, default: () => new Object() }
  },
  save(): void {
    this.$emit("save");
    this.$emit("update:modelValue", false);
  }
});
</script>
