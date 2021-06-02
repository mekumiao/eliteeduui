<template>
  <el-card>
    <el-card>
      <el-button type="success" size="mini" @click="create">新增</el-button>
    </el-card>
    <my-page-table :get-data="getData" v-model="isLoad">
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="描述" prop="Remark"></el-table-column>
      <el-table-column label="资源路径" prop="VideoPath"></el-table-column>
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
            :src="'http://file.linshengweb.com/files/' + scope.row.PreviewPhoto"
          ></el-image>
          <div v-else>暂无图片</div>
        </template>
      </el-table-column>
      <el-table-column
        label="儿歌分类"
        prop="EliteSongClassifyName"
      ></el-table-column>
      <my-page-table-column-base></my-page-table-column-base>
    </my-page-table>
  </el-card>

  <app-dialog
    title="新增课件资源"
    width="60%"
    v-model="dialogCreate.show"
    @save="createSave"
  >
    <el-form ref="formCreate" label-width="80px" :model="dialogCreate.formData">
      <el-form-item label="名称" prop="Name">
        <el-input v-model="dialogCreate.formData.Name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="Remark">
        <el-input v-model="dialogCreate.formData.Remark"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="ResourceType">
        <el-select
          v-model="dialogCreate.formData.ResourceType"
          placeholder="请选择资源类型"
        >
          <el-option
            v-for="(item, index) in resourceType.DataList"
            :key="index"
            :label="item.Label"
            :value="item.Value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源路径" prop="SourcePath">
        <my-file-upload
          v-model="dialogCreate.formData.SourcePath"
        ></my-file-upload>
      </el-form-item>
      <el-form-item label="预览图" prop="PreviewPhoto">
        <my-image-upload
          v-model="dialogCreate.formData.PreviewPhoto"
        ></my-image-upload>
      </el-form-item>
    </el-form>
  </app-dialog>

  <app-dialog
    title="修改课件资源"
    width="60%"
    v-model="dialogUpdate.show"
    @save="updateSave"
  >
  </app-dialog>
</template>

<script lang="ts">
import {
  ObjFilterInput,
  OptionFilterInput,
  OptionItem,
  PageInput,
  PageOutput
} from "@/apis/apiBase";
import {
  apiEduCourseware,
  CoursewareInput,
  CoursewareOutput,
  CoursewareUpdInput
} from "@/apis/eduCoursewareApi";
import AppDialog from "@/components/AppDialog.vue";
import MyPageTable from "@/components/MyPageTable.vue";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import MyFileUpload from "@/components/MyFileUpload.vue";
import MyImageUpload from "@/components/MyImageUpload.vue";
import { DialogData, DialogEditData } from "@/types/el-dialog";
import { defineComponent, reactive, ref } from "vue";

/**课件管理 */
export default defineComponent({
  name: "Courseware",
  components: {
    MyPageTable,
    MyPageTableColumnBase,
    AppDialog,
    MyFileUpload,
    MyImageUpload
  },
  setup() {
    const isLoad = ref(true);
    const resourceType = reactive(new PageOutput<OptionItem>());
    const dialogCreate = reactive<DialogData<CoursewareInput>>({
      show: false,
      formData: {} as CoursewareInput
    });
    const dialogUpdate = reactive<
      DialogEditData<CoursewareUpdInput, CoursewareOutput>
    >({
      show: false,
      formData: {} as CoursewareUpdInput,
      oldData: {} as CoursewareOutput
    });
    return { isLoad, resourceType, dialogCreate, dialogUpdate };
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<CoursewareOutput>
    ): Promise<PageOutput<CoursewareOutput>> {
      const filter: ObjFilterInput<CoursewareOutput> = {
        Page: page,
        Condition: {
          Logic: "and",
          Items: [
            { Field: "Name", Value: match, Compare: "contains" },
            { Field: "Remark", Value: match, Compare: "contains" }
          ]
        }
      };
      return apiEduCourseware.QueryPageCourseware(filter);
    },
    /**加载资源分类 */
    async loadResourceType(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.resourceType.DataList.length === 0) {
          const input = new OptionFilterInput("courseware");
          this.resourceType = await apiEduCourseware.QueryOption(input);
        }
      } finally {
        this.$closeLoading();
      }
    },
    /**打开新增 */
    async create(): Promise<void> {
      await this.loadResourceType();
      this.dialogCreate.formData = {} as CoursewareInput;
      this.dialogCreate.show = true;
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiEduCourseware.CreateCourseware(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async update(_index: number, row: CoursewareOutput): Promise<void> {
      await this.loadResourceType();
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
    },
    /**保存编辑 */
    async updateSave(close: () => void): Promise<void> {
      try {
        await this.$useRules("formUpdate").validate();
        this.$loading();
        await apiEduCourseware.UpdateCourseware(
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
