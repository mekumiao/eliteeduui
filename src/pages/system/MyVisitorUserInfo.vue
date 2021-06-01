<template>
  <el-card>
    <el-card>
      <div>访客用户管理</div>
    </el-card>
    <my-page-table v-model="isLoad" :get-data="getData">
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="手机号" prop="Phone"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.Auth" size="mini" type="success">
            允许访问
          </el-tag>
          <el-tag v-else size="mini" type="danger">未审核</el-tag>
        </template>
      </el-table-column>
      <my-page-table-column-base></my-page-table-column-base>
      <template #button="scope">
        <el-button-group>
          <el-button
            plain
            size="mini"
            type="primary"
            @click="Auth(scope.$index, scope.row)"
            v-if="!scope.row.Auth"
          >
            审核通过
          </el-button>
          <el-button
            plain
            size="mini"
            type="primary"
            @click="UnAuth(scope.$index, scope.row)"
            v-else
          >
            取消审核
          </el-button>
          <app-button-popover
            @confirm="deleteSave(scope.$index, scope.row)"
          ></app-button-popover>
        </el-button-group>
      </template>
    </my-page-table>
  </el-card>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent, ref } from "vue";
import { apiUserInfo, VisitorUserInfoOutput } from "@/apis/userInfoApi";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import AppButtonPopover from "@/components/AppButtonPopover.vue";

export default defineComponent({
  name: "MyVisitorUserInfo",
  components: { MyPageTable, MyPageTableColumnBase, AppButtonPopover },
  setup() {
    const isLoad = ref(true);
    return { isLoad };
  },
  methods: {
    /**获取数据 */
    async getData(
      match: string,
      page: PageInput<VisitorUserInfoOutput>
    ): Promise<PageOutput<VisitorUserInfoOutput>> {
      const filter: ObjFilterInput<VisitorUserInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [{ Compare: "contains", Field: "Name", Value: match }]
        }
      };
      return apiUserInfo.QueryPageVisitoryUserInfo(filter);
    },
    /**审核通过 */
    async Auth(_index: number, row: VisitorUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.AuthVisitoryUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**取消审核 */
    async UnAuth(_index: number, row: VisitorUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.UnAuthVisitoryUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**删除用户 */
    async deleteSave(_index: number, row: VisitorUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.DeleteVisitoryUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    }
  }
});
</script>
