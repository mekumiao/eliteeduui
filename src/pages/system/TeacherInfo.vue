<template>
  <div class="teacher-info">
    <el-card>
      <el-card>
        <el-button type="success" size="mini" @click="create">新增</el-button>
      </el-card>
      <my-page-table
        :get-data="getData"
        v-model="isLoad"
        @edit="update"
        @deleteSave="deleteSave"
      >
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="年龄" prop="Age"></el-table-column>
        <el-table-column label="账号" prop="Account"></el-table-column>
        <el-table-column label="学校" prop="SchoolInfoName"></el-table-column>
        <my-gender-table-column></my-gender-table-column>
        <my-portrait-table-column></my-portrait-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增教师信息"
      v-model="dialogCreate.show"
      @save="createSave"
      :fullscreen="true"
    >
      <el-form ref="formCreate" :model="dialogCreate.formData" :rules="rules">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="名称" prop="Name">
              <el-input v-model="dialogCreate.formData.Name"></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="SchoolInfoPid">
              <el-select v-model="dialogCreate.formData.SchoolInfoPid">
                <el-option
                  v-for="(item, idx) in schoolOption"
                  :key="idx"
                  :label="item.Label"
                  :value="item.Value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户" prop="UserInfoPid">
              <el-input
                :model-value="dialogCreate.selectUser.FullName"
                disabled
              ></el-input>
            </el-form-item>
            <my-user-info-search @selected="selectedUser"></my-user-info-search>
          </el-col>
        </el-row>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改教师信息"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form ref="formUpdate" :model="dialogUpdate.formData" :rules="rules">
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dialogUpdate.formData.Name"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="SchoolInfoPid">
          <el-select v-model="dialogUpdate.formData.SchoolInfoPid">
            <el-option
              v-for="(item, idx) in schoolOption"
              :key="idx"
              :label="item.Label"
              :value="item.Value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import {
  TeacherInfoOutput,
  apiEduTeacherInfo,
  TeacherInfoInput,
  TeacherInfoUpdInput
} from "@/apis/eduTeacherInfoApi";
import { apiEduSchoolInfo } from "@/apis/eduSchoolInfoApi";
import MyGenderTableColumn from "@/components/MyGenderTableColumn.vue";
import MyPortraitTableColumn from "@/components/MyPortraitTableColumn.vue";
import { MyOptionFilterInput } from "@/utils/my-apiClass";
import { UserInfoOutput } from "@/apis/adminUserInfoApi";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  UserInfoPid: [
    { required: true, message: "必填", trigger: "blur" }
  ] as FormRule[],
  SchoolInfoPid: [
    { required: true, message: "必填", trigger: "blur" }
  ] as FormRule[]
});

interface CreateDialogData extends DialogData<TeacherInfoInput> {
  selectUser: UserInfoOutput;
}

export default defineComponent({
  name: "TeacherInfo",
  components: { MyGenderTableColumn, MyPortraitTableColumn },
  setup() {
    const isLoad = ref(true);
    const schoolOption = ref<Array<OptionItem>>([]);
    const dialogCreate = reactive<CreateDialogData>({
      show: false,
      selectUser: {} as UserInfoOutput,
      formData: {} as TeacherInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<TeacherInfoUpdInput, TeacherInfoOutput>
    >({
      show: false,
      formData: {} as TeacherInfoUpdInput,
      oldData: {} as TeacherInfoOutput
    });
    return { isLoad, schoolOption, dialogCreate, dialogUpdate, rules };
  },
  methods: {
    async getData(match: string, page: PageInput<TeacherInfoOutput>) {
      const filter: ObjFilterInput<TeacherInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [{ Compare: "contains", Field: "Name", Value: match }]
        }
      };
      return apiEduTeacherInfo.QueryPage(filter);
    },
    /**加载学校选项 */
    async loadSchoolInfoOptions(flag?: boolean) {
      try {
        this.$loading();
        if (flag || this.schoolOption.length === 0) {
          const input = new MyOptionFilterInput();
          const data = await apiEduSchoolInfo.QueryOption(input);
          this.schoolOption.push(...data.DataList);
        }
      } finally {
        this.$closeLoading();
      }
    },
    /**打开新增 */
    async create(): Promise<void> {
      await this.loadSchoolInfoOptions();
      this.dialogCreate.selectUser = {} as UserInfoOutput;
      this.dialogCreate.formData = {} as TeacherInfoInput;
      this.dialogCreate.show = true;
      return await Promise.resolve();
    },
    async createSave(close: () => void) {
      try {
        this.$loading();
        this.dialogCreate.formData.UserInfoPid =
          this.dialogCreate.selectUser.Pid;
        await this.$useRules("formCreate").validate();
        await apiEduTeacherInfo.Create(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async update(_index: number, row: TeacherInfoOutput): Promise<void> {
      await this.loadSchoolInfoOptions();
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
      return await Promise.resolve();
    },
    async updateSave(close: () => void) {
      try {
        this.$loading();
        await this.$useRules("formUpdate").validate();
        await apiEduTeacherInfo.Update(
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
    /**保存删除 */
    async deleteSave(_index: number, row: TeacherInfoOutput): Promise<void> {
      try {
        this.$loading();
        await apiEduTeacherInfo.Delete(row.Pid, row.Timestamp);
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    selectedUser(row: UserInfoOutput) {
      this.dialogCreate.selectUser = row;
      this.dialogCreate.formData.UserInfoPid = row.Pid;
    }
  }
});
</script>
