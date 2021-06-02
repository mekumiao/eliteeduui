<template>
  <app-top-menu title="浏览课程" @select="select">
    <template #dropdown>
      <el-dropdown-item command="logout" icon="el-icon-switch-button">
        退出登录
      </el-dropdown-item>
    </template>
  </app-top-menu>
  <el-card>
    <my-page-table :get-data="getData" v-model="isLoad">
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="描述" prop="Remark"></el-table-column>
      <el-table-column label="课程资源" prop="VideoPath">
        <template #default="scope">
          <a
            :href="
              'http://file.linshengweb.com/files/' +
              encodeURI(scope.row.VideoPath)
            "
            target="blank"
          >
            {{ scope.row.VideoPath }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="预览图"
        prop="PreviewPhoto"
        min-width="150"
        align="center"
      >
        <template #default="scope">
          <el-image
            v-if="scope.row.PreviewPhoto"
            style="width: 100px"
            fit="contain"
            :src="
              'http://file.linshengweb.com/files/' +
              encodeURI(scope.row.PreviewPhoto)
            "
          ></el-image>
          <div v-else>暂无图片</div>
        </template>
      </el-table-column>
      <el-table-column
        label="儿歌分类"
        prop="EliteSongClassifyName"
      ></el-table-column>
      <template #button>
        <span></span>
      </template>
    </my-page-table>
  </el-card>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import { apiVipCourseware, CoursewareOutput } from "@/apis/vipCoursewareApi";
import AppTopMenu from "@/components/AppTopMenu.vue";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "VipCourseware",
  components: { MyPageTable, AppTopMenu },
  setup() {
    const eliteSongs = ref<CoursewareOutput[]>();
    const isLoad = ref(true);
    return { eliteSongs, isLoad };
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<CoursewareOutput>
    ): Promise<PageOutput<CoursewareOutput>> {
      if (window.localStorage.getItem("vipToken")) {
        const filter: ObjFilterInput<CoursewareOutput> = {
          Condition: {
            Logic: "or",
            Items: [
              { Field: "Name", Value: match, Compare: "contains" },
              { Field: "Remark", Value: match, Compare: "contains" }
            ]
          },
          Page: page
        };
        return await apiVipCourseware.QueryPageCourseware(filter);
      } else {
        this.$router.push("/vipLogin");
        return Promise.resolve<PageOutput<CoursewareOutput>>(
          new PageOutput<CoursewareOutput>()
        );
      }
    },
    select(tag: string) {
      switch (tag) {
        case "logout":
          window.localStorage.removeItem("vipToken");
          this.$router.push("/vipLogin");
          break;
        default:
          break;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
