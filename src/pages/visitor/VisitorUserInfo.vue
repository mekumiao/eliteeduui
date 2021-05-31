<template>
  <el-card>访客浏览课程页面</el-card>
  <el-card>
    <el-row
      type="flex"
      :gutter="20"
      justify="space-between"
      v-if="eliteSongs && eliteSongs.length > 0"
    >
      <el-col :span="6" v-for="(item, idx) in eliteSongs" :key="idx">
        <a
          :href="'http://file.linshengweb.com/files/' + item.VideoPath"
          target="_blank"
        >
          <el-image
            :src="'http://file.linshengweb.com/files/' + item.PreviewPhoto"
          ></el-image>
        </a>
        <div>{{ item.Name }}</div>
      </el-col>
    </el-row>
    <div v-else>等待管理员审核</div>
  </el-card>
</template>

<script lang="ts">
import { ObjFilterInput, PageOutput } from "@/apis/apiBase";
import {
  apiVisitorCoursewareResource,
  EliteSongOutput
} from "@/apis/visitorCoursewareResourceApi";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const eliteSongs = ref<EliteSongOutput[]>();
    return { eliteSongs };
  },
  async mounted() {
    try {
      if (window.localStorage.getItem("visitorToken")) {
        const pageData = await this.QueryPageEliteSong();
        this.eliteSongs = pageData.DataList;
      } else {
        this.$router.push("visitorLogin");
      }
    } catch {
      this.$router.push("visitorLogin");
    }
  },
  methods: {
    /**查询爱利特儿歌 */
    async QueryPageEliteSong(): Promise<PageOutput<EliteSongOutput>> {
      const filter: ObjFilterInput<EliteSongOutput> = {
        Page: {
          Index: 1,
          Size: 200
        }
      };
      return await apiVisitorCoursewareResource.QueryPageEliteSong(filter);
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  position: fixed;
  z-index: 1000;
  top: 0px;
}

.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
