<template>
  <div class="courseware">
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
        <el-table-column label="描述" prop="Remark"></el-table-column>
        <el-table-column label="分组" prop="Group"></el-table-column>
        <el-table-column label="排序" prop="Sort"></el-table-column>
        <el-table-column
          label="课件预览"
          prop="SourcePath"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <my-resource-preview
              :source-name="scope.row.Name + '.pptx'"
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
              :src="$storeGetters.mergeSourceHost(scope.row.PreviewPhoto)"
            ></el-image>
            <div v-else>暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column
          label="课件类型"
          prop="ResourceTypeName"
        ></el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      title="新增课件资源"
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
          <el-input v-model="dialogCreate.formData.Name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogCreate.formData.Remark"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="Group">
          <el-input v-model="dialogCreate.formData.Group"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="Sort">
          <el-input v-model.number="dialogCreate.formData.Sort"></el-input>
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
          <el-input v-model="dialogCreate.formData.SourcePath"></el-input>
          <my-file-upload
            v-model="dialogCreate.formData.SourcePath"
            @success="uploadSuccess"
          ></my-file-upload>
        </el-form-item>
        <el-form-item label="预览图" prop="PreviewPhoto">
          <el-input v-model="dialogCreate.formData.PreviewPhoto"></el-input>
          <my-image-upload
            v-model="dialogCreate.formData.PreviewPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      title="修改课件资源"
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
          <el-input v-model="dialogUpdate.formData.Name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogUpdate.formData.Remark"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="Group">
          <el-input v-model="dialogUpdate.formData.Group"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="Sort">
          <el-input v-model.number="dialogUpdate.formData.Sort"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="ResourceType">
          <el-select
            v-model="dialogUpdate.formData.ResourceType"
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
          <el-input v-model="dialogUpdate.formData.SourcePath"></el-input>
          <my-file-upload
            v-model="dialogUpdate.formData.SourcePath"
            @success="uploadSuccess"
          ></my-file-upload>
        </el-form-item>
        <el-form-item label="预览图" prop="PreviewPhoto">
          <el-input v-model="dialogUpdate.formData.PreviewPhoto"></el-input>
          <my-image-upload
            v-model="dialogUpdate.formData.PreviewPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import {
  apiEduCourseware,
  CoursewareInput,
  CoursewareOutput,
  CoursewareUpdInput
} from "@/apis/eduCoursewareApi";
import { defineComponent, reactive, ref } from "vue";
import { UploadFile } from "node_modules/element-plus/lib/el-upload/src/upload.type";
import { MyPageOutput, MyOptionFilterInput } from "@/utils/my-apiClass";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Remark: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Group: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Sort: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  ResourceType: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[],
  SourcePath: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[],
  PreviewPhoto: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[]
});

/**课件管理 */
export default defineComponent({
  name: "Courseware",
  setup() {
    const isLoad = ref(true);
    const resourceType = reactive(new MyPageOutput<OptionItem>());
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
    return { isLoad, resourceType, dialogCreate, dialogUpdate, rules };
  },
  methods: {
    async getData(match: string, page: PageInput<CoursewareOutput>) {
      page.TryAddSort("Group");
      page.TryAddSort("Sort");
      page.TryAddSort("Name");
      page.TryAddSort("CreateTime");
      const filter: ObjFilterInput<CoursewareOutput> = {
        Page: page,
        Condition: {
          Logic: "and",
          Items: [
            { Field: "Name", Value: match, Compare: "contains" },
            { Field: "Remark", Value: match, Compare: "contains" },
            { Field: "Group", Value: match, Compare: "contains" }
          ]
        }
      };
      return apiEduCourseware.QueryPage(filter);
    },
    /**加载资源分类 */
    async loadResourceType(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.resourceType.DataList.length === 0) {
          const input = new MyOptionFilterInput("courseware");
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
        await apiEduCourseware.Create(this.dialogCreate.formData);
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
        await apiEduCourseware.Update(
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
    async deleteSave(_index: number, row: CoursewareOutput): Promise<void> {
      await apiEduCourseware.Delete(row.Pid, row.Timestamp);
      this.isLoad = true;
    },
    /**文件上传成功后设置文档的类型 */
    uploadSuccess(file: UploadFile) {
      const start = file.name.lastIndexOf(".");
      if (start >= 0) {
        const myDocument = ".ppt,.pptx,.xls,.xlsx,.doc,.docx";
        const myImage = ".png,.jpg,.jpeg,.gif";
        const myVideo = ".mp4";
        const myAudio = ".mp3";
        const name = file.name.substring(start).toLowerCase();
        if (myDocument.indexOf(name) >= 0) {
          this.dialogCreate.formData.ResourceType = 1;
          this.dialogUpdate.formData.ResourceType = 1;
        } else if (myVideo.indexOf(name) >= 0) {
          this.dialogCreate.formData.ResourceType = 2;
          this.dialogUpdate.formData.ResourceType = 2;
        } else if (myAudio.indexOf(name) >= 0) {
          this.dialogCreate.formData.ResourceType = 3;
          this.dialogUpdate.formData.ResourceType = 3;
        } else if (myImage.indexOf(name) >= 0) {
          this.dialogCreate.formData.ResourceType = 4;
          this.dialogUpdate.formData.ResourceType = 4;
        } else {
          this.dialogCreate.formData.ResourceType = 0;
          this.dialogUpdate.formData.ResourceType = 0;
        }
      }
    }
  }
});
</script>
