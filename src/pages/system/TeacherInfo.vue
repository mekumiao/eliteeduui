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
        <el-table-column label="姓名" prop="Name"></el-table-column>
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
      width="60%"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form ref="formCreate" :model="dialogCreate.formData" :rules="rules">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="用户" prop="UserInfoPid">
              <my-user-info-search
                v-model="dialogCreate.formData.UserInfoPid"
                @change="userChange"
              ></my-user-info-search>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="班级" prop="ClassInfoPids">
              <my-class-info-cascader
                :school="dialogCreate.formData.SchoolInfoPid"
                v-model="dialogCreate.formData.ClassInfoPids"
              ></my-class-info-cascader>
            </el-form-item>
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
        <el-row :gutter="12">
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责班级" prop="ClassInfoPids">
              <my-class-info-cascader
                :school="dialogUpdate.formData.SchoolInfoPid"
                v-model="dialogUpdate.formData.ClassInfoPids"
              ></my-class-info-cascader>
            </el-form-item>
          </el-col>
        </el-row>
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
import MyClassInfoCascader from "@/components/MyClassInfoCascader.vue";

const rules = reactive({
  UserInfoPid: [
    { required: true, message: "请选择用户", trigger: "change" }
  ] as FormRule[],
  SchoolInfoPid: [
    { required: true, message: "请选择学校", trigger: "change" }
  ] as FormRule[],
  ClassInfoPids: [
    {
      type: "array",
      required: true,
      message: "请至少选择一个班级",
      trigger: "change"
    }
  ]
});

export default defineComponent({
  name: "TeacherInfo",
  components: {
    MyGenderTableColumn,
    MyPortraitTableColumn,
    MyClassInfoCascader
  },
  setup() {
    const isLoad = ref(true);
    const schoolOption = ref<Array<OptionItem>>([]);
    const dialogCreate = reactive<DialogData<TeacherInfoInput>>({
      show: false,
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
    userChange() {
      this.$useRules("formCreate").validateField("UserInfoPid", () => {
        return {};
      });
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
      this.dialogCreate.formData = {} as TeacherInfoInput;
      this.dialogCreate.show = true;
      return await Promise.resolve();
    },
    async createSave(close: () => void) {
      try {
        this.$loading();
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
      const detailRow = await apiEduTeacherInfo.Single(row.Pid);
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = detailRow;
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
    }
  }
});
</script>
