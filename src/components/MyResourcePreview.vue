<template>
  <el-space>
    <a
      v-if="resourceType === 1"
      target="_blank"
      :href="'http://ow365.cn/?i=25220&ssl=1&furl=' + previewUrl"
    >
      点击预览
    </a>
    <audio
      v-else-if="resourceType === 3"
      style="width: 80%"
      controls
      :src="previewUrl"
    ></audio>
    <el-image
      v-else-if="resourceType === 4"
      hide-on-click-modal
      style="width: 100px; height: 100px"
      :src="previewUrl"
      :preview-src-list="[previewUrl]"
    >
    </el-image>
    <a
      v-show="isDownload"
      :href="previewUrl"
      :download="sourceName || sourcePath"
    >
      点击下载
    </a>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**资源预览组件 */
export default defineComponent({
  name: "MyResourcePreview",
  props: {
    sourceName: { type: String, default: "" },
    resourceType: { type: Number, default: 0 },
    sourcePath: { type: String, default: "" },
    isDownload: { type: Boolean, default: false }
  },
  computed: {
    previewUrl(): string {
      return this.$storeGetters.mergeSourceHost(this.sourcePath);
    }
  }
});
</script>
