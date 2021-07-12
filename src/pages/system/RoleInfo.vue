<template>
  <div class="role-info">
    <el-card>
      <el-card>
        <el-button-group>
          <el-button type="success" size="mini" @click="create">新增</el-button>
        </el-button-group>
      </el-card>
      <my-page-table
        :get-data="getData"
        v-model="isLoad"
        @edit="update"
        @deleteSave="deleteSave"
      >
        <el-table-column label="名称" prop="RoleName"></el-table-column>
        <el-table-column label="别名" prop="AnotherName"></el-table-column>
        <el-table-column label="描述" prop="Describe"></el-table-column>
        <el-table-column label="是否管理员" prop="IsAdmin">
          <template #default="scope">
            <el-tag v-if="scope.row.IsAdmin" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增角色信息"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form ref="formCreate" :model="dialogCreate.formData" :rules="rules">
        <el-form-item label="名称" prop="RoleName">
          <el-input v-model="dialogCreate.formData.RoleName"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="AnotherName">
          <el-input v-model="dialogCreate.formData.AnotherName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Describe">
          <el-input v-model="dialogCreate.formData.Describe"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员" prop="IsAdmin">
          <el-radio-group v-model="dialogCreate.formData.IsAdmin">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改角色信息"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form ref="formUpdate" :model="dialogUpdate.formData" :rules="rules">
        <el-form-item label="名称" prop="RoleName">
          <el-input v-model="dialogUpdate.formData.RoleName"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="AnotherName">
          <el-input v-model="dialogUpdate.formData.AnotherName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Describe">
          <el-input v-model="dialogUpdate.formData.Describe"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员" prop="IsAdmin">
          <el-radio-group v-model="dialogUpdate.formData.IsAdmin">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  apiAdminRoleInfo,
  RoleInfoInput,
  RoleInfoOutput,
  RoleInfoUpdInput
} from "@/apis/adminRoleInfoApi";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Remark: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Value: [{ required: true, message: "必填", trigger: "change" }] as FormRule[],
  Group: [{ required: true, message: "必填", trigger: "change" }] as FormRule[]
});

export default defineComponent({
  setup() {
    const isLoad = ref(true);
    const dialogCreate = reactive<DialogData<RoleInfoInput>>({
      show: false,
      formData: {} as RoleInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<RoleInfoUpdInput, RoleInfoOutput>
    >({
      show: false,
      formData: {} as RoleInfoUpdInput,
      oldData: {} as RoleInfoOutput
    });
    return { isLoad, dialogCreate, dialogUpdate, rules };
  },
  methods: {
    /**查询 */
    async getData(match: string, page: PageInput<RoleInfoOutput>) {
      const filter: ObjFilterInput<RoleInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [{ Compare: "contains", Field: "RoleName", Value: match }]
        }
      };
      return apiAdminRoleInfo.QueryPage(filter);
    },
    /**打开编辑 */
    async update(_index: number, row: RoleInfoOutput): Promise<void> {
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
      return await Promise.resolve();
    },
    /**保存编辑 */
    async updateSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await this.$useRules("formUpdate").validate();
        await apiAdminRoleInfo.Update(
          this.dialogUpdate.oldData.Pid,
          this.dialogUpdate.oldData.Timestamp,
          this.dialogUpdate.formData
        );
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开新增 */
    async create(): Promise<void> {
      this.dialogCreate.formData = {} as RoleInfoInput;
      this.dialogCreate.show = true;
      return await Promise.resolve();
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await this.$useRules("formCreate").validate();
        await apiAdminRoleInfo.Create(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**保存删除 */
    async deleteSave(_index: number, row: RoleInfoOutput): Promise<void> {
      try {
        this.$loading();
        await apiAdminRoleInfo.Delete(row.Pid, row.Timestamp);
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    }
  }
});
</script>
