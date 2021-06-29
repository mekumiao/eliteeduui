<template>
  <div class="app-portrait" :style="imgSize">
    <el-image :src="imageUrl" fit="cover">
      <template #placeholder>
        <div class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </template>
      <template #error>
        <img
          :height="imgSize.height.replace('px', '')"
          :width="imgSize.width.replace('px', '')"
          src="@/assets/logo.png"
          class="el-image"
          style="object-fit: fill"
        />
      </template>
    </el-image>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

interface DataImgSize {
  height: string;
  width: string;
}

export default defineComponent({
  name: "AppPortrait",
  props: {
    imgUrl: { type: String, default: "" },
    size: { type: Number, default: 100 }
  },
  setup(props) {
    const imgSize = reactive<DataImgSize>({
      height: `${props.size}px`,
      width: `${props.size}px`
    });
    return { imgSize };
  },
  computed: {
    imageUrl(): string {
      return this.$storeGetters.mergeSourceHost(this.imgUrl);
    }
  }
});
</script>

<style lang="scss" scoped>
.app-portrait {
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  background-color: #fff;

  .el-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .image-slot {
    width: 100%;
    height: 100%;

    .el-icon-picture-outline {
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #f5f7fa;
      color: #909399;
    }
  }
}
</style>
