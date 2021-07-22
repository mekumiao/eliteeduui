<template>
  <div class="MyUserInfoSearch">
    <my-page-table :get-data="getData" v-model="isLoad">
      <el-table-column label="姓名" prop="FullName"></el-table-column>
      <el-table-column label="昵称" prop="NickName"></el-table-column>
      <el-table-column label="手机号" prop="Phone"></el-table-column>
      <my-gender-table-column></my-gender-table-column>
      <template #button="scope">
        <el-button
          type="success"
          size="mini"
          @click="selected(scope.row, scope.$index)"
        >
          选择
        </el-button>
      </template>
    </my-page-table>
  </div>
</template>

<script lang="ts">
import { apiAdminUserInfo, UserInfoOutput } from "@/apis/adminUserInfoApi";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyUserInfoSearch",
  emits: ["selected"],
  setup() {
    const isLoad = ref(true);
    return { isLoad };
  },
  methods: {
    async getData(match: string, page: PageInput<UserInfoOutput>) {
      const filter: ObjFilterInput<UserInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "FullName", Value: match },
            { Compare: "contains", Field: "NickName", Value: match },
            { Compare: "contains", Field: "Phone", Value: match }
          ]
        }
      };
      return apiAdminUserInfo.QueryPage(filter);
    },
    selected(row: UserInfoOutput): void {
      this.$emit("selected", row);
    }
  }
});
</script>
