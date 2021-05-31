<template>
  <el-card>
    <el-card>
      <div>访客用户管理</div>
    </el-card>
    <my-page-table :get-data="getData"></my-page-table>
  </el-card>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent } from "vue";
import { apiUserInfo, VisitorUserInfoOutput } from "@/apis/userInfoApi";

export default defineComponent({
  components: { MyPageTable },
  setup() {
    return {};
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<VisitorUserInfoOutput>
    ): Promise<PageOutput<VisitorUserInfoOutput>> {
      try {
        this.$loading();
        const filter: ObjFilterInput<VisitorUserInfoOutput> = {
          Page: page,
          Condition: {
            Logic: "or",
            Items: [{ Compare: "contains", Field: "Name", Value: match }]
          }
        };
        return apiUserInfo.QueryPageVisitoryUserInfo(filter);
      } finally {
        this.$closeLoading();
      }
    }
  }
});
</script>
