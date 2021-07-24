<template>
  <div class="user-info">
    <el-card>
      <el-card>
        <el-button type="success" size="mini" @click="create">新增</el-button>
      </el-card>
      <my-page-table
        v-model="isLoad"
        :get-data="getData"
        @edit="update"
        @deleteSave="deleteSave"
      >
        <el-table-column label="昵称" prop="NickName"></el-table-column>
        <el-table-column label="姓名" prop="FullName"></el-table-column>
        <my-gender-table-column></my-gender-table-column>
        <my-portrait-table-column></my-portrait-table-column>
        <el-table-column label="年龄" prop="Age"></el-table-column>
        <my-date-table-column
          label="生日"
          prop="Birthday"
        ></my-date-table-column
        ><my-tags-table-column
          label="角色"
          prop="Roles"
          item-name="AnotherName"
        ></my-tags-table-column>
        <el-table-column label="电话" prop="Phone"></el-table-column>
        <el-table-column label="邮箱" prop="Email"></el-table-column>
        <el-table-column label="身份ID" prop="Identity"></el-table-column>
        <el-table-column label="账号" prop="Account"></el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增用户信息"
      v-model="dialogCreate.show"
      @save="createSave"
    >
      <el-form ref="formCreate" :model="dialogCreate.formData" :rules="rules">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="昵称" prop="NickName">
              <el-input v-model="dialogCreate.formData.NickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="Gender">
              <el-radio-group v-model="dialogCreate.formData.Gender">
                <el-radio-button :label="0">男</el-radio-button>
                <el-radio-button :label="1">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="姓名" prop="FullName">
              <el-input v-model="dialogCreate.formData.FullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="Birthday">
              <el-date-picker
                v-model="dialogCreate.formData.Birthday"
                type="date"
                placeholder="选择日期"
                :disabled-date="disabledDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="手机号" prop="Phone">
              <el-input v-model="dialogCreate.formData.Phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="PassWord">
              <el-input
                show-password
                v-model="dialogCreate.formData.PassWord"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="Email">
              <el-input v-model="dialogCreate.formData.Email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="头像" prop="Portrait">
              <my-image-upload
                v-model="dialogCreate.formData.Portrait"
              ></my-image-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改用户信息"
      v-model="dialogUpdate.show"
      @save="updateSave"
    >
      <el-form ref="formUpdate" :model="dialogUpdate.formData" :rules="rules">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="昵称" prop="NickName">
              <el-input v-model="dialogUpdate.formData.NickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="Gender">
              <el-radio-group v-model="dialogUpdate.formData.Gender">
                <el-radio-button :label="0">男</el-radio-button>
                <el-radio-button :label="1">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="姓名" prop="FullName">
              <el-input v-model="dialogUpdate.formData.FullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="Birthday">
              <el-date-picker
                v-model="dialogUpdate.formData.Birthday"
                type="date"
                placeholder="请选择日期"
                :disabled-date="disabledDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="手机号" prop="Phone">
              <el-input v-model="dialogUpdate.formData.Phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="Email">
              <el-input v-model="dialogUpdate.formData.Email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="头像" prop="Portrait">
              <my-image-upload
                v-model="dialogUpdate.formData.Portrait"
              ></my-image-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import {
  apiAdminUserInfo,
  UserInfoInput,
  UserInfoOutput,
  UserInfoUpdInput
} from "@/apis/adminUserInfoApi";
import MyPortraitTableColumn from "@/components/MyPortraitTableColumn.vue";
import { ref, reactive, defineComponent } from "vue";

const getRules = function () {
  return {
    FullName: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[],
    NickName: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[],
    Gender: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[],
    Portrait: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[],
    Birthday: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[],
    Phone: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
    Email: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
    PassWord: [
      { required: true, message: "必填", trigger: "blur" }
    ] as FormRule[]
  };
};

const rules = reactive(getRules());

export default defineComponent({
  components: { MyPortraitTableColumn },
  name: "UserInfo",
  setup() {
    const isLoad = ref(true);
    const dialogCreate = reactive<DialogData<UserInfoInput>>({
      show: false,
      formData: {} as UserInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<UserInfoUpdInput, UserInfoOutput>
    >({
      show: false,
      formData: {} as UserInfoUpdInput,
      oldData: {} as UserInfoOutput
    });
    return { isLoad, dialogCreate, dialogUpdate, rules };
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
            { Compare: "contains", Field: "NickName", Value: match },
            { Compare: "contains", Field: "Phone", Value: match }
          ]
        }
      };
      return apiAdminUserInfo.QueryPage(filter);
    },
    disabledDate(time: Date): boolean {
      return (
        time.getTime() > Date.now() ||
        time.getTime() < new Date("1940-1-1").getTime()
      );
    },
    /**打开新增 */
    async create(): Promise<void> {
      this.dialogCreate.formData = {} as UserInfoInput;
      this.dialogCreate.show = true;
      return await Promise.resolve();
    },
    async createSave(close: () => void) {
      try {
        this.$loading();
        await this.$useRules("formCreate").validate();
        await apiAdminUserInfo.Create(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async update(_index: number, row: UserInfoOutput): Promise<void> {
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
      return await Promise.resolve();
    },
    async updateSave(close: () => void) {
      try {
        this.$loading();
        await this.$useRules("formUpdate").validate();
        await apiAdminUserInfo.Update(
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
    async deleteSave(_index: number, row: UserInfoOutput): Promise<void> {
      try {
        this.$loading();
        await apiAdminUserInfo.Delete(row.Pid, row.Timestamp);
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    }
  }
});
</script>
