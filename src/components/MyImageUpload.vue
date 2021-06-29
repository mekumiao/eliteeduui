<template>
  <el-upload
    ref="upload"
    list-type="picture-card"
    accept="image/*"
    :action="uploadHost"
    :auto-upload="true"
    :multiple="false"
    :show-file-list="false"
    :on-change="handleChange"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
  >
    <template #default>
      <i v-if="!dialogImageUrl" class="el-icon-plus"></i>
      <img v-else :src="dialogImageUrl" />
    </template>
  </el-upload>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { UploadFile } from "node_modules/element-plus/lib/el-upload/src/upload.type";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyImageUpload",
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: String, default: "" }
  },
  setup(props) {
    const dialogImageUrl = ref<string | undefined>("");
    if (props.modelValue) {
      const store = useStore();
      dialogImageUrl.value = store.getters.mergeSourceHost(props.modelValue);
    }
    return { dialogImageUrl };
  },
  computed: {
    uploadHost(): string {
      return this.$store.state.uploadHost ?? "";
    }
  },
  methods: {
    handleChange(file: UploadFile, fileList: UploadFile[]) {
      if (fileList.length > 0) {
        fileList.length = 0;
      }
      if (file.status === "ready") {
        this.dialogImageUrl = file.url;
      }
      fileList.push(file);
    },
    handleBeforeUpload(): void {
      this.$loading();
    },
    handleSuccess(response: Record<string, unknown>) {
      this.$closeLoading();
      this.$emit("update:modelValue", response.filename);
    },
    handleError(error: unknown): void {
      this.$closeLoading();
      this.$message.showError(error);
    }
  }
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
