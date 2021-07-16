<template>
  <div class="app-course-info">
    <el-card>
      <el-card>
        <el-button-group>
          <el-button type="success" size="mini" @click="create">新增</el-button>
        </el-button-group>
      </el-card>
      <my-page-table
        v-model="isLoad"
        :get-data="getData"
        @edit="edit"
        @deleteSave="deleteSave"
      >
        <el-table-column label="名称" prop="Name"></el-table-column>
        <el-table-column label="描述" prop="Remark"></el-table-column>
        <el-table-column label="封面图片" min-width="150" align="center">
          <template #default="scope">
            <el-image
              v-if="scope.row.CoverPhoto"
              style="width: 100px"
              fit="contain"
              :src="$storeGetters.mergeSourceHost(scope.row.CoverPhoto)"
            ></el-image>
            <div v-else>暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column
          label="课程分类"
          prop="CourseClassifyName"
        ></el-table-column>
        <el-table-column label="是否分期">
          <template #default="scope">
            <el-tag v-if="scope.row.IsPart" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否完结">
          <template #default="scope">
            <el-tag v-if="scope.row.IsTheEnd" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="LastPublish"></el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      v-model="dialogCreate.show"
      title="新增课程"
      @save="createSave"
      fullscreen
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
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogCreate.formData.Remark" />
        </el-form-item>
        <el-form-item label="课程分类">
          <el-select
            v-model="dialogCreate.formData.CourseClassifyPid"
            placeholder="请选择课程分类"
          >
            <el-option
              v-for="(item, index) in classify.DataList"
              :key="index"
              :label="item.Label"
              :value="item.Value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片">
          <my-image-upload
            v-model="dialogCreate.formData.CoverPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="addCreateDetail">添加</el-button>
      <el-table :data="dialogCreate.formData.CourseDetails">
        <el-table-column property="Sort" label="期数"></el-table-column>
        <el-table-column label="描述">
          <template #default="scope">
            <el-input v-model="scope.row.Remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="预览图片">
          <template #default="scope">
            <my-image-upload v-model="scope.row.PreviewPhoto"></my-image-upload>
          </template>
        </el-table-column>
        <el-table-column label="资源路径">
          <template #default="scope">
            <my-file-upload v-model="scope.row.ResourcePath"></my-file-upload>
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button type="danger" @click="removeCreateDetail(scope.$index)">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </app-edit-dialog>

    <app-edit-dialog
      v-model="dialogUpdate.show"
      title="修改课程"
      fullscreen
      @save="editSave"
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
        <el-form-item label="描述" prop="Remark">
          <el-input v-model="dialogUpdate.formData.Remark" />
        </el-form-item>
        <el-form-item label="课程分类">
          <el-select
            v-model="dialogUpdate.formData.CourseClassifyPid"
            placeholder="请选择课程分类"
          >
            <el-option
              v-for="(item, index) in classify.DataList"
              :key="index"
              :label="item.Label"
              :value="item.Value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片">
          <my-image-upload
            v-model="dialogUpdate.formData.CoverPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="addUpdateDetail">添加</el-button>
      <el-table :data="dialogUpdate.formData.CourseDetails">
        <el-table-column property="Sort" label="期数"></el-table-column>
        <el-table-column label="描述">
          <template #default="scope">
            <el-input v-model="scope.row.Remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="预览图片">
          <template #default="scope">
            <my-image-upload v-model="scope.row.PreviewPhoto"></my-image-upload>
          </template>
        </el-table-column>
        <el-table-column label="资源路径">
          <template #default="scope">
            <my-file-upload v-model="scope.row.ResourcePath"></my-file-upload>
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button type="danger" @click="removeUpdateDetail(scope.$index)">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  apiEduAppResource,
  CourseDetailInput,
  CourseDetailUpdInput,
  CourseInfoInput,
  CourseInfoOutput,
  CourseInfoUpdInput
} from "@/apis/eduAppResourceApi";
import { MyOptionFilterInput, MyPageOutput } from "@/utils/my-apiClass";

const rules = reactive({
  Name: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  Remark: [{ required: true, message: "必填", trigger: "blur" }] as FormRule[],
  EliteSongClassify: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[],
  VideoPath: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[],
  PreviewPhoto: [
    { required: true, message: "必填", trigger: "change" }
  ] as FormRule[]
});

export default defineComponent({
  name: "AppEliteSong",
  setup() {
    const isLoad = ref(true);
    const classify = reactive(new MyPageOutput<OptionOutput>());
    const dialogCreate = reactive<DialogData<CourseInfoInput>>({
      show: false,
      formData: {} as CourseInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<CourseInfoUpdInput, CourseInfoOutput>
    >({
      show: false,
      formData: {} as CourseInfoUpdInput,
      oldData: {} as CourseInfoOutput
    });
    return {
      isLoad,
      classify,
      dialogCreate,
      dialogUpdate,
      rules
    };
  },
  methods: {
    async getData(match: string, page: PageInput<CourseInfoOutput>) {
      page.TryAddSort("CreateTime", true);
      const filter: ObjFilterInput<CourseInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "Name", Value: match },
            { Compare: "contains", Field: "Remark", Value: match }
          ]
        }
      };
      return apiEduAppResource.QueryPageCourseInfo(filter);
    },
    /**加载课程分类 */
    async loadClassify(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.classify.DataList.length === 0) {
          const input = new MyOptionFilterInput("courseClassify");
          this.classify = await apiEduAppResource.QueryOption(input);
        }
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async edit(_index: number, row: CourseInfoOutput): Promise<void> {
      await this.loadClassify();
      this.dialogUpdate.oldData = row;
      const obj = reactive({ ...row });
      obj.CourseDetails = row.CourseDetails.map((item) => {
        return { ...item };
      });
      this.dialogUpdate.formData = obj;
      this.dialogUpdate.show = true;
    },
    /**保存编辑 */
    async editSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await apiEduAppResource.UpdateCourseInfo(
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
      await this.loadClassify();
      this.dialogCreate.show = true;
      this.dialogCreate.formData = {
        CourseDetails: []
      } as unknown as CourseInfoInput;
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiEduAppResource.CreateCourseInfo(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**删除并保存 */
    async deleteSave(_index: number, row: CourseInfoOutput): Promise<void> {
      await apiEduAppResource.DeleteCourseInfo(row.Pid, row.Timestamp);
      this.isLoad = true;
    },
    /**移除新增时的项 */
    removeCreateDetail(index: number) {
      this.dialogCreate.formData.CourseDetails.splice(index, 1);
    },
    /**移除修改时的项 */
    removeUpdateDetail(index: number) {
      this.dialogUpdate.formData.CourseDetails?.splice(index, 1);
    },
    addCreateDetail() {
      const sort = this.dialogCreate.formData.CourseDetails.length;
      const item: CourseDetailInput = {
        Sort: sort + 1,
        Remark: "",
        PreviewPhoto: "",
        ResourcePath: ""
      };
      this.dialogCreate.formData.CourseDetails.push(item);
    },
    addUpdateDetail() {
      const sort = this.dialogUpdate.formData.CourseDetails?.length ?? 0;
      const item: CourseDetailUpdInput = {
        Pid: "0",
        Sort: sort + 1
      };
      this.dialogUpdate.formData.CourseDetails?.push(item);
    }
  }
});
</script>
