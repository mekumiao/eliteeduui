<template>
  <el-upload
    :action="uploadHost"
    :http-request="request"
    :accept="accept"
    :auto-upload="true"
    :file-list="fileList"
    :multiple="false"
    :show-file-list="true"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-error="handleError"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script lang="ts">
import {
  ElUpload,
  ElUploadProgressEvent,
  ElUploadRequestOptions,
  UploadFile
} from "node_modules/element-plus/lib/el-upload/src/upload.type";
import { defineComponent, ref } from "vue";
import axios from "axios";

export const number = ref(0);

export default defineComponent({
  name: "MyCustomerFileUpload",
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
  computed: {
    uploadHost(): string {
      return this.$store.state.uploadHost;
    }
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
    },
    handleError(error: unknown): void {
      this.$closeLoading();
      this.$message.showError(error);
    },
    async request(
      option: ElUploadRequestOptions
    ): Promise<Record<string, string>> {
      try {
        const formData = new FormData();
        formData.append("file", option.file);
        const res = await axios.post(option.action, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.total > 0) {
              (progressEvent as ElUploadProgressEvent).percent =
                (progressEvent.loaded / progressEvent.total) * 100;
            }
            option.onProgress(progressEvent);
          }
        });
        return res.data;
      } catch (error) {
        option.onError(error);
        return Promise.reject();
      }
    }
  }
});
</script>
