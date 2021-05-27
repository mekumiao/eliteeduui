<template>
  <el-upload
    action="http://file.linshengweb.com/upload/"
    list-type="picture-card"
    accept="image/*"
    :auto-upload="true"
    :multiple="false"
    :show-file-list="false"
    :on-change="handleChange"
    :on-success="handleSuccess"
  >
    <template #default>
      <i v-if="!dialogImageUrl" class="el-icon-plus"></i>
      <img v-else :src="dialogImageUrl" />
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts">
import { UploadFile } from "node_modules/element-plus/lib/el-upload/src/upload.type";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyImageUpload",
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: String, default: "" }
  },
  setup() {
    const dialogImageUrl = ref<string | undefined>("");
    const dialogVisible = ref(false);
    const disabled = ref(false);
    return { dialogImageUrl, dialogVisible, disabled };
  },
  methods: {
    handleRemove(file: UploadFile) {
      console.log(file);
    },
    handlePictureCardPreview(file: UploadFile) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file: UploadFile, fileList: UploadFile[]) {
      if (fileList.length > 0) {
        fileList.length = 0;
      }
      if (file.status === "ready") {
        this.dialogImageUrl = file.url;
      }
      fileList.push(file);
    },
    handleSuccess(response: Record<string, unknown>) {
      this.$emit("update:modelValue", response.filename);
    }
  }
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
