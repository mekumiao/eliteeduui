<template>
  <el-card>
    <el-card>
      <el-button type="success" size="mini">新增</el-button>
    </el-card>
    <my-page-table></my-page-table>
  </el-card>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent } from "vue";

/**课件管理 */
export default defineComponent({
  components: { MyPageTable },
  name: "Courseware",
  setup() {
    return {};
  },
  async getData(
    match: string,
    page: PageInput<unknown>
  ): Promise<PageOutput<unknown>> {
    const filter: ObjFilterInput<unknown> = {
      Page: page,
      Condition: {
        Logic: "and",
        Items: [
          { Field: "", Value: match, Compare: "contains" },
          { Field: "", Value: match, Compare: "contains" },
          { Field: "", Value: match, Compare: "contains" }
        ]
      }
    };
    return Promise.reject();
  }
});
</script>
