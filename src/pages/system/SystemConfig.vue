<template>
  <div class="system-config">
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
        <el-table-column label="分组名称" prop="Group"></el-table-column>
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="值" prop="Value"></el-table-column>
        <el-table-column label="描述" prop="Remark"></el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增系统配置"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form ref="formCreate" :model="dialogCreate.formData" :rules="rules">
        <el-form-item label="分组名称" prop="Group">
          <el-input v-model="dialogCreate.formData.Group"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogCreate.formData.Name"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="Value">
          <el-input v-model="dialogCreate.formData.Value"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogCreate.formData.Remark"></el-input>
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改系统配置"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form ref="formUpdate" :model="dialogUpdate.formData" :rules="rules">
        <el-form-item label="分组名称" prop="Group">
          <el-input v-model="dialogUpdate.formData.Group"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogUpdate.formData.Name"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="Value">
          <el-input v-model="dialogUpdate.formData.Value"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogUpdate.formData.Remark"></el-input>
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import {
  apiSystemConfig,
  SystemConfigInput,
  SystemConfigOutput,
  SystemConfigUpdInput
} from "@/apis/adminSystemConfigApi";
import MyPageTable from "@/components/MyPageTable.vue";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import AppEditDialog from "@/components/AppEditDialog.vue";
import { DialogData, DialogEditData } from "@/types/el-dialog";
import { defineComponent, reactive, ref } from "vue";
import { FormRule } from "@/types/el-rules";
import {
  ObjFilterInput,
  PageInput,
  PageOutput
} from "@/apis/base/publicEntity";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Remark: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Value: [{ required: true, message: "必填", trigger: "change" }] as FormRule[],
  Group: [{ required: true, message: "必填", trigger: "change" }] as FormRule[]
});

export default defineComponent({
  name: "SystemConfig",
  components: { MyPageTable, MyPageTableColumnBase, AppEditDialog },
  setup() {
    const isLoad = ref(true);
    const dialogCreate = reactive<DialogData<SystemConfigInput>>({
      show: false,
      formData: {} as SystemConfigInput
    });
    const dialogUpdate = reactive<
      DialogEditData<SystemConfigUpdInput, SystemConfigOutput>
    >({
      show: false,
      formData: {} as SystemConfigUpdInput,
      oldData: {} as SystemConfigOutput
    });
    return { isLoad, dialogCreate, dialogUpdate, rules };
  },
  methods: {
    /**查询 */
    async getData(
      match: string,
      page: PageInput<SystemConfigOutput>
    ): Promise<PageOutput<SystemConfigOutput>> {
      page.TryAddSort("CreateTime", true);
      const filter: ObjFilterInput<SystemConfigOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "Group", Value: match },
            { Compare: "contains", Field: "Name", Value: match },
            { Compare: "contains", Field: "Value", Value: match },
            { Compare: "contains", Field: "Remark", Value: match }
          ]
        }
      };
      return apiSystemConfig.QueryPage(filter);
    },
    /**打开编辑 */
    async update(_index: number, row: SystemConfigOutput): Promise<void> {
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
        await apiSystemConfig.Update(
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
      this.dialogCreate.formData = {} as SystemConfigInput;
      this.dialogCreate.show = true;
      return await Promise.resolve();
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await this.$useRules("formCreate").validate();
        await apiSystemConfig.Create(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**保存删除 */
    async deleteSave(_index: number, row: SystemConfigOutput): Promise<void> {
      try {
        this.$loading();
        await apiSystemConfig.Delete(row.Pid, row.Timestamp);
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    }
  }
});
</script>
