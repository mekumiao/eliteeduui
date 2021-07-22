<template>
  <div class="app-painting-info">
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
        <el-table-column label="资源路径" prop="SourcePath"></el-table-column>
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
          label="绘本分类"
          prop="PaintingClassityName"
        ></el-table-column>
        <my-page-table-column-base></my-page-table-column-base>
      </my-page-table>
    </el-card>

    <app-edit-dialog
      v-model="dialogCreate.show"
      title="新增绘本资源"
      @save="createSave"
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
        <el-form-item label="绘本分类" prop="PaintingClassityPid">
          <el-select
            v-model="dialogCreate.formData.PaintingClassityPid"
            placeholder="请选择绘本分类"
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
        <el-form-item label="资源路径" prop="SourcePath">
          <el-input v-model="dialogCreate.formData.SourcePath"></el-input>
          <!-- <my-file-upload
            v-model="dialogCreate.formData.SourcePath"
            accept=".zip"
          ></my-file-upload> -->
        </el-form-item>
        <el-form-item label="预览图" prop="PreviewPhoto">
          <my-image-upload
            v-model="dialogCreate.formData.PreviewPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
    </app-edit-dialog>

    <app-edit-dialog
      v-model="dialogUpdate.show"
      title="修改绘本资源"
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
        <el-form-item label="绘本分类" prop="PaintingClassityPid">
          <el-select
            v-model="dialogUpdate.formData.PaintingClassityPid"
            placeholder="请选择绘本分类"
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
        <el-form-item label="资源路径" prop="SourcePath">
          <el-input v-model="dialogUpdate.formData.SourcePath"></el-input>
          <!-- <my-file-upload
            v-model="dialogUpdate.formData.SourcePath"
            accept=".zip"
          ></my-file-upload> -->
        </el-form-item>
        <el-form-item label="预览图" prop="PreviewPhoto">
          <my-image-upload
            v-model="dialogUpdate.formData.PreviewPhoto"
          ></my-image-upload>
        </el-form-item>
      </el-form>
    </app-edit-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  apiEduAppResource,
  PaintingInfoInput,
  PaintingInfoOutput,
  PaintingInfoUpdInput
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
    const classify = reactive(new MyPageOutput<OptionItem>());
    const dialogCreate = reactive<DialogData<PaintingInfoInput>>({
      show: false,
      formData: {} as PaintingInfoInput
    });
    const dialogUpdate = reactive<
      DialogEditData<PaintingInfoUpdInput, PaintingInfoOutput>
    >({
      show: false,
      formData: {} as PaintingInfoUpdInput,
      oldData: {} as PaintingInfoOutput
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
    async getData(match: string, page: PageInput<PaintingInfoOutput>) {
      page.TryAddSort("CreateTime", true);
      const filter: ObjFilterInput<PaintingInfoOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "Name", Value: match },
            { Compare: "contains", Field: "Remark", Value: match }
          ]
        }
      };
      return apiEduAppResource.QueryPagePaintingInfo(filter);
    },
    /**加载绘本分类 */
    async loadClassify(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.classify.DataList.length === 0) {
          const input = new MyOptionFilterInput("paintclassify");
          this.classify = await apiEduAppResource.QueryOption(input);
        }
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async edit(_index: number, row: PaintingInfoOutput): Promise<void> {
      await this.loadClassify();
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
    },
    /**保存编辑 */
    async editSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await apiEduAppResource.UpdatePaintingInfo(
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
      this.dialogCreate.formData = {} as PaintingInfoInput;
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiEduAppResource.CreatePaintingInfo(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**删除并保存 */
    async deleteSave(_index: number, row: PaintingInfoOutput): Promise<void> {
      await apiEduAppResource.DeletePaintingInfo(row.Pid, row.Timestamp);
      this.isLoad = true;
    }
  }
});
</script>
