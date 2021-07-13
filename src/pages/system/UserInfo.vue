<template>
  <div class="user-info">
    <el-card>
      <el-card>
        <el-button type="success">新增</el-button>
      </el-card>
      <my-page-table :get-data="getData">
        <el-table-column label="姓名" prop="FullName"></el-table-column>
        <el-table-column label="昵称" prop="NickName"></el-table-column>
        <el-table-column label="性别">
          <template #default="scope">
            <el-tag v-if="scope.row.Gender === 0" effect="dark">男</el-tag>
            <el-tag
              v-else-if="scope.row.Gender === 1"
              type="danger"
              effect="dark"
            >
              女
            </el-tag>
            <el-tag v-else>其他</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="Age"></el-table-column>
        <el-table-column label="头像" prop="Portrait"></el-table-column>
        <el-table-column label="生日" prop="Birthday"></el-table-column>
        <el-table-column label="电话" prop="Phone"></el-table-column>
        <el-table-column label="邮箱" prop="Email"></el-table-column>
        <el-table-column label="身份ID" prop="Identity"></el-table-column>
        <el-table-column label="账号" prop="Account"></el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag
              type="success"
              effect="dark"
              v-for="(item, idx) in scope.row.Roles"
              :key="idx"
            >
              {{ item.AnotherName }}
            </el-tag>
            <el-tag
              type="info"
              effect="dark"
              v-if="scope.row.Roles.length === 0"
            >
              无
            </el-tag>
          </template>
        </el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { apiAdminUserInfo, UserInfoOutput } from "@/apis/adminUserInfoApi";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInfo",
  setup() {
    return {};
  },
  methods: {
    /**查询 */
    async getData(match: string, page: PageInput<UserInfoOutput>) {
      const filter: ObjFilterInput<UserInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "FullName", Value: match },
            { Compare: "contains", Field: "NickName", Value: match }
          ]
        }
      };
      return apiAdminUserInfo.QueryPage(filter);
    }
  }
});
</script>
