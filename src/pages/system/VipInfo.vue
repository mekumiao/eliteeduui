<template>
  <div class="vip-user-info">
    <el-card>
      <el-card>
        <el-button-group>
          <el-button type="success" @click="create" size="mini">
            添加
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
      title="新增会员"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form
        ref="formCreate"
        label-width="80px"
        :model="dialogCreate.formData"
        :rules="rulesCreate"
      >
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogCreate.formData.Name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model="dialogCreate.formData.Phone" />
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改会员"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form
        ref="formUpdate"
        label-width="80px"
        :model="dialogUpdate.formData"
        :rules="rulesUpdate"
      >
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogUpdate.formData.Name" />
        </el-form-item>
        <el-form-item label="手机号码">
          {{ dialogUpdate.formData.Phone }}
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  apiVipInfo,
  VipInfoInput,
  VipInfoOutput,
  VipInfoUpdInput
} from "@/apis/vipInfoApi";
import { UserInfoOutput } from "@/apis/adminUserInfoApi";

const rulesCreate = reactive({
  Phone: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[]
});

const rulesUpdate = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[]
});

export default defineComponent({
  name: "VipInfo",
  setup() {
    const isLoad = ref(true);
    const dialogCreate = reactive<DialogData<VipInfoInput>>({
      show: false,
      formData: {} as VipInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<VipInfoUpdInput, VipInfoOutput>
    >({
      show: false,
      formData: {} as VipInfoUpdInput,
      oldData: {} as VipInfoOutput
    });
    return { isLoad, dialogCreate, dialogUpdate, rulesCreate, rulesUpdate };
  },
  methods: {
    /**获取数据 */
    async getData(match: string, page: PageInput<UserInfoOutput>) {
      const filter: ObjFilterInput<UserInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Field: "FullName", Value: match, Compare: "startswith" },
            { Field: "NickName", Value: match, Compare: "startswith" },
            { Field: "Phone", Value: match, Compare: "startswith" }
          ]
        }
      };
      return apiVipInfo.QueryPage(filter);
    },
    /**审核通过 */
    async Auth(_index: number, row: VipInfoOutput) {
      try {
        this.$loading();
        await apiVipInfo.AuthVipInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**取消审核 */
    async UnAuth(_index: number, row: VipInfoOutput) {
      try {
        this.$loading();
        await apiVipInfo.UnAuthVipInfoById(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**删除VIP用户 */
    async deleteSave(_index: number, row: VipInfoOutput) {
      try {
        this.$loading();
        await apiVipInfo.Delete(row.Pid);
      } finally {
        this.$closeLoading();
        this.isLoad = true;
      }
    },
    /**打开新增 */
    async create() {
      this.dialogCreate.formData = {} as VipInfoInput;
      this.dialogCreate.show = true;
      return Promise.resolve();
    },
    /**创建VIP用户 */
    async createSave(close: () => void) {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiVipInfo.Create(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async update(_index: number, row: VipInfoOutput) {
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
        await apiVipInfo.Update(
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
