﻿<template>
  <el-dialog
    destroy-on-close
    :title="title"
    :model-value="modelValue"
    :width="width"
    :close-on-click-modal="false"
    @opened="focus"
    @closed="close"
  >
    <el-form :model="dialogData" label-width="80px" @submit.prevent>
      <el-form-item :label="oneItem.title">
        <el-input ref="ipt" v-model="mdValue" @keyup.enter="save"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">
          取&nbsp;消
        </el-button>
        <el-button type="primary" @click="save">保&nbsp;存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

interface FormItemInfo {
  title: string;
  field: string;
}

export default defineComponent({
  name: "AppEditDialogOne",
  props: {
    title: { type: String as PropType<string>, default: "标题" },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "30%"
    },
    modelValue: { type: Boolean as PropType<boolean>, default: false },
    oneItem: { type: Object as PropType<FormItemInfo>, required: true },
    formData: {
      type: Object as PropType<Record<string, unknown>>,
      required: true
    }
  },
  setup(props) {
    const iptValue = ref<unknown>();
    const dialogData = computed(() => props.formData);
    const mdValue = computed({
      get(): unknown {
        if (iptValue.value === undefined) {
          return props.formData[props.oneItem.field];
        } else {
          return iptValue;
        }
      },
      set(value: unknown): void {
        iptValue.value = value;
      }
    });
    return { iptValue, dialogData, mdValue };
  },
  methods: {
    save(): void {
      this.$emit("save", this.mdValue);
      this.$emit("update:modelValue", false);
    },
    close(): void {
      this.iptValue = undefined;
      this.$emit("update:modelValue", false);
    },
    focus() {
      (this.$refs.ipt as HTMLElement).focus();
    }
  }
});
</script>
