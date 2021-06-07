<template>
  <el-space>
    <a
      v-if="resourceType === 1"
      target="_blank"
      :href="
        'https://view.officeapps.live.com/op/view.aspx?src=http://file.linshengweb.com/files/' +
        encodeURI(sourcePath)
      "
    >
      点击预览 </a
    ><audio
      v-else-if="resourceType === 3"
      style="width: 80%"
      controls
      :src="'http://file.linshengweb.com/files/' + encodeURI(sourcePath)"
    ></audio>
    <el-image
      v-else-if="resourceType === 4"
      hide-on-click-modal
      style="width: 100px; height: 100px"
      :src="'http://file.linshengweb.com/files/' + encodeURI(sourcePath)"
      :preview-src-list="[
        'http://file.linshengweb.com/files/' + encodeURI(sourcePath)
      ]"
    >
    </el-image>
    <a
      v-show="isDownload"
      :href="'http://file.linshengweb.com/files/' + encodeURI(sourcePath)"
      :download="sourceName || sourcePath"
    >
      点击下载
    </a>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { download } from "@/utils/my-download";

/**资源预览组件 */
export default defineComponent({
  name: "MyResourcePreview",
  props: {
    sourceName: { type: String, default: undefined },
    resourceType: { type: Number, default: 0 },
    sourcePath: { type: String, default: undefined },
    isDownload: { type: Boolean, default: false }
  },
  methods: {
    download(): void {
      const url = `http://file.linshengweb.com/files/${encodeURI(
        this.sourcePath
      )}`;
      const fileName = this.sourcePath || this.sourceName;
      download(url, fileName);
    }
  }
});
</script>
