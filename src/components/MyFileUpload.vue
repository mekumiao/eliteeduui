<template>
  <el-upload
    action="http://file.linshengweb.com/upload/"
    :accept="accept"
    :auto-upload="true"
    :file-list="fileList"
    :multiple="false"
    :show-file-list="true"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script lang="ts">
import {
  ElUpload,
  UploadFile
} from "node_modules/element-plus/lib/el-upload/src/upload.type";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyFileUpload",
  // emits: ["update:modelValue", "success"],
  emits: {
    "update:modelValue"(value: string) {
      return value !== undefined;
    },
    success(file: UploadFile) {
      const res = file !== undefined;
      return res;
    }
  },
  props: {
    modelValue: { type: String, default: "" },
    accept: { type: String, default: "" }
  },
  setup(props) {
    const upload = ref<ElUpload>();
    const fileList = ref<Array<Record<string, string>>>([]);
    if (props.modelValue) {
      fileList.value.push({ name: props.modelValue });
    }
    return { upload, fileList };
  },
  methods: {
    handleChange(file: UploadFile, fileList: UploadFile[]) {
      this.upload?.clearFiles();
      fileList.length = 0;
      this.fileList.length = 0;
      fileList.push(file);
    },
    handleRemove(file: UploadFile): void {
      if (this.modelValue === file.name) {
        this.$emit("update:modelValue", "");
      }
    },
    handleBeforeUpload(): void {
      this.$loading();
    },
    handleSuccess(response: Record<string, unknown>, file: UploadFile): void {
      this.$closeLoading();
      file.name = response.filename as string;
      this.$emit("update:modelValue", file.name);
      this.$emit("success", file);
    }
  }
});
</script>
