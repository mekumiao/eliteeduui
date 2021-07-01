<template>
  <div class="vip-courseware">
    <vip-top-menu title="浏览课件"></vip-top-menu>
    <el-card>
      <my-page-table :get-data="getData" v-model="isLoad">
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="描述" prop="Remark"></el-table-column>
        <el-table-column
          label="课件类型"
          prop="ResourceTypeName"
        ></el-table-column>
        <el-table-column label="课件预览" prop="SourcePath" align="center">
          <template #default="scope">
            <my-resource-preview
              :source-name="scope.row.Name"
              :resource-type="scope.row.ResourceType"
              :source-path="scope.row.SourcePath"
            ></my-resource-preview>
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
              :src="$storeGetters.mergeSourceHost(scope.row.PreviewPhoto)"
            ></el-image>
            <div v-else>暂无图片</div>
          </template>
        </el-table-column>
        <template #button>
          <span></span>
        </template>
      </my-page-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { apiVipCourseware, CoursewareOutput } from "@/apis/vipCoursewareApi";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "VipCourseware",
  setup() {
    const eliteSongs = ref<CoursewareOutput[]>();
    const isLoad = ref(true);
    return { eliteSongs, isLoad };
  },
  methods: {
    async getData(match: string, page: PageInput<CoursewareOutput>) {
      page.TryAddSort("Group");
      page.TryAddSort("Sort");
      page.TryAddSort("Name");
      page.TryAddSort("CreateTime");
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
    }
  }
});
</script>

<style lang="scss" scoped>
.vip-courseware {
  width: 100%;

  .el-col {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
