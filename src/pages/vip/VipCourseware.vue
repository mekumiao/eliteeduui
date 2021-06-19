<template>
  <app-top-menu title="浏览课件" @select="select">
    <template #dropdown>
      <el-dropdown-item command="password" icon="el-icon-switch-button">
        修改密码
      </el-dropdown-item>
      <el-dropdown-item command="logout" icon="el-icon-switch-button">
        退出登录
      </el-dropdown-item>
    </template>
  </app-top-menu>
  <el-card>
    <my-page-table :get-data="getData" v-model="isLoad">
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="描述" prop="Remark"></el-table-column>
      <el-table-column
        label="课件类型"
        prop="ResourceTypeName"
      ></el-table-column>
      <el-table-column label="课件预览" prop="SourcePath" align="center">
        <template #default="scope">
          <my-resource-preview
            :source-name="scope.row.Name"
            :resource-type="scope.row.ResourceType"
            :source-path="scope.row.SourcePath"
          ></my-resource-preview>
        </template>
      </el-table-column>
      <el-table-column
        label="预览图"
        prop="PreviewPhoto"
        min-width="150"
        align="center"
      >
        <template #default="scope">
          <el-image
            v-if="scope.row.PreviewPhoto"
            style="width: 100px"
            fit="contain"
            :src="
              'http://file.linshengweb.com/files/' +
              encodeURI(scope.row.PreviewPhoto)
            "
          ></el-image>
          <div v-else>暂无图片</div>
        </template>
      </el-table-column>
      <template #button>
        <span></span>
      </template>
    </my-page-table>
  </el-card>

  <app-edit-dialog
    title="修改密码"
    v-model="dialogUpdPassword.show"
    @save="save"
  >
    <el-form
      ref="formOldPassword"
      :model="dialogUpdPassword"
      :rules="rolesUpdPassword"
      v-if="isOldUpdPassword"
    >
      <el-form-item label="手机号">
        <span>{{ dialogUpdPassword.formData.Phone }}</span>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input
          type="password"
          v-model="dialogUpdPassword.formData.OldPassWord"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          type="password"
          v-model="dialogUpdPassword.formData.PassWord"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          type="password"
          v-model="dialogUpdPassword.formData.ConfirmPassWord"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="formVerificationCode"
      :model="dialogUpdPassword"
      :rules="rolesResetPassword"
      v-else
    >
      <el-form-item label="手机号">
        <span>{{ dialogUpdPassword.formData.Phone }}</span>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          type="text"
          v-model="dialogUpdPassword.formData.PassWord"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input
          type="text"
          v-model="dialogUpdPassword.formData.Code"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </app-edit-dialog>
</template>

<script lang="ts">
import {
  apiAuth,
  PasswordUpdInput,
  PasswordWithPhoneCodeUpdInput
} from "@/apis/adminAuthApi";
import { apiVipUserInfo } from "@/apis/vipUserInfoApi";
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import { apiVipCourseware, CoursewareOutput } from "@/apis/vipCoursewareApi";
import AppEditDialog from "@/components/AppEditDialog.vue";
import AppTopMenu from "@/components/AppTopMenu.vue";
import MyPageTable from "@/components/MyPageTable.vue";
import MyResourcePreview from "@/components/MyResourcePreview.vue";
import { DialogData } from "@/types/el-dialog";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "VipCourseware",
  components: { MyPageTable, AppTopMenu, MyResourcePreview, AppEditDialog },
  setup() {
    const eliteSongs = ref<CoursewareOutput[]>();
    const isLoad = ref(true);
    const isOldUpdPassword = ref(true);
    const dialogUpdPassword = reactive<
      DialogData<
        PasswordUpdInput & PasswordWithPhoneCodeUpdInput & { Phone: string }
      >
    >({
      show: false,
      formData: {} as PasswordUpdInput &
        PasswordWithPhoneCodeUpdInput & { Phone: string }
    });
    return { eliteSongs, isLoad, dialogUpdPassword, isOldUpdPassword };
  },
  beforeMount() {
    if (!window.localStorage.getItem("vipToken")) {
      this.$router.push("/vipLogin");
    }
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<CoursewareOutput>
    ): Promise<PageOutput<CoursewareOutput>> {
      page.TryAddSort("Group");
      page.TryAddSort("Sort");
      page.TryAddSort("Name");
      page.TryAddSort("CreateTime");
      const filter: ObjFilterInput<CoursewareOutput> = {
        Condition: {
          Logic: "or",
          Items: [
            { Field: "Name", Value: match, Compare: "contains" },
            { Field: "Remark", Value: match, Compare: "contains" }
          ]
        },
        Page: page
      };
      return await apiVipCourseware.QueryPageCourseware(filter);
    },
    async select(tag: string) {
      if (tag === "logout") {
        window.localStorage.removeItem("vipToken");
        this.$router.push("/vipLogin");
      } else if (tag === "password") {
        const vipUser = await apiVipUserInfo.GetCurrentVipUserInfo();
        debugger;
        this.dialogUpdPassword.formData.Phone = vipUser.Phone;
        this.dialogUpdPassword.show = true;
      }
    },
    async save(colse: () => void) {
      if (this.isOldUpdPassword) {
        await this.$useRules("formOldPassword").validate();
        apiAuth.VipUpdatePasswordByOldPassword(this.dialogUpdPassword.formData);
        colse();
      } else {
        await this.$useRules("formVerificationCode").validate();
        apiAuth.VipResetPasswordByVerificationCode(
          this.dialogUpdPassword.formData
        );
        colse();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.el-col {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
