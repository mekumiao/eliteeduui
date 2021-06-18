<template>
  <div class="vip-user-info">
    <el-card>
      <el-card>
        <el-button-group>
          <el-button type="success" @click="create" size="mini">
            新增VIP用户
          </el-button>
        </el-button-group>
      </el-card>
      <my-page-table v-model="isLoad" :get-data="getData" :search-width="210">
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
              type="primary"
              @click="Auth(scope.$index, scope.row)"
              v-if="!scope.row.Auth"
            >
              确认审核
            </el-button>
            <el-button
              plain
              type="warning"
              @click="UnAuth(scope.$index, scope.row)"
              v-else
            >
              取消审核
            </el-button>
            <el-button
              plain
              type="primary"
              @click="update(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <app-button-popover
              @confirm="deleteSave(scope.$index, scope.row)"
            ></app-button-popover>
          </el-button-group>
        </template>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增VIP用户"
      width="60%"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form
        ref="formCreate"
        label-width="80px"
        :model="dialogCreate.formData"
        :rules="rules"
      >
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogCreate.formData.Name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model="dialogCreate.formData.Phone" />
        </el-form-item>
        <el-form-item label="登录密码" prop="PassWord">
          <el-input v-model="dialogCreate.formData.PassWord" />
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改VIP用户"
      width="60%"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form
        ref="formUpdate"
        label-width="80px"
        :model="dialogUpdate.formData"
        :rules="rules"
      >
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogUpdate.formData.Name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model="dialogUpdate.formData.Phone" />
        </el-form-item>
        <el-form-item label="登录密码" prop="PassWord">
          <el-input v-model="dialogUpdate.formData.PassWord" />
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent, reactive, ref } from "vue";
import {
  apiUserInfo,
  VipUserInfoInput,
  VipUserInfoOutput,
  VipUserInfoUpdInput
} from "@/apis/adminUserInfoApi";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import AppButtonPopover from "@/components/AppButtonPopover.vue";
import AppEditDialog from "@/components/AppEditDialog.vue";
import { FormRule } from "@/types/el-rules";
import { DialogData, DialogEditData } from "@/types/el-dialog";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Phone: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  PassWord: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[]
});

export default defineComponent({
  name: "VipUserInfo",
  components: {
    MyPageTable,
    MyPageTableColumnBase,
    AppButtonPopover,
    AppEditDialog
  },
  setup() {
    const isLoad = ref(true);
    const dialogCreate = reactive<DialogData<VipUserInfoInput>>({
      show: false,
      formData: {} as VipUserInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<VipUserInfoUpdInput, VipUserInfoOutput>
    >({
      show: false,
      formData: {} as VipUserInfoUpdInput,
      oldData: {} as VipUserInfoOutput
    });
    return { isLoad, dialogCreate, dialogUpdate, rules };
  },
  methods: {
    /**获取数据 */
    async getData(
      match: string,
      page: PageInput<VipUserInfoOutput>
    ): Promise<PageOutput<VipUserInfoOutput>> {
      const filter: ObjFilterInput<VipUserInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Field: "Name", Value: match, Compare: "startswith" },
            { Field: "Phone", Value: match, Compare: "startswith" }
          ]
        }
      };
      return apiUserInfo.QueryPageVipUserInfo(filter);
    },
    /**审核通过 */
    async Auth(_index: number, row: VipUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.AuthVipUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**取消审核 */
    async UnAuth(_index: number, row: VipUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.UnAuthVipUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**删除VIP用户 */
    async deleteSave(_index: number, row: VipUserInfoOutput) {
      try {
        this.$loading();
        await apiUserInfo.DeleteVipUserInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**打开新增 */
    async create() {
      this.dialogCreate.formData = {} as VipUserInfoInput;
      this.dialogCreate.show = true;
      return Promise.resolve();
    },
    /**创建VIP用户 */
    async createSave(close: () => void) {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiUserInfo.CreateVipUserInfo(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async update(_index: number, row: VipUserInfoOutput) {
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = { ...row };
      this.dialogUpdate.show = true;
      return Promise.resolve();
    },
    /**保存编辑 */
    async updateSave(close: () => void) {
      try {
        this.$loading();
        await this.$useRules("formUpdate").validate();
        await apiUserInfo.UpdateVipUserInfo(
          this.dialogUpdate.oldData.Pid,
          this.dialogUpdate.oldData.Timestamp,
          this.dialogUpdate.formData
        );
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    }
  }
});
</script>
