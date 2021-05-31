<template>
  <el-upload
    action="http://file.linshengweb.com/upload/"
    accept=".mp4"
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
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: String, default: "" }
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
      file.name = response.filename as string;
      this.$emit("update:modelValue", response.filename);
      this.$closeLoading();
    }
  }
});
</script>
