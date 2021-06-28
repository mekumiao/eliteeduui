<template>
  <div class="app-elite-song">
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
              :src="
                'http://file.linshengweb.com/files/' + scope.row.PreviewPhoto
              "
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

    <app-edit-dialog
      v-model="dialogCreate.show"
      title="新增爱利特儿歌"
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
        <el-form-item label="儿歌分类" prop="EliteSongClassify">
          <el-select
            v-model="dialogCreate.formData.EliteSongClassify"
            placeholder="请选择儿歌分类"
          >
            <el-option
              v-for="(item, index) in eliteSongClassify.DataList"
              :key="index"
              :label="item.Label"
              :value="item.Value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源路径" prop="VideoPath">
          <my-file-upload
            v-model="dialogCreate.formData.VideoPath"
          ></my-file-upload>
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
      title="修改爱利特儿歌"
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
        <el-form-item label="儿歌分类" prop="EliteSongClassify">
          <el-select
            v-model="dialogUpdate.formData.EliteSongClassify"
            placeholder="请选择儿歌分类"
          >
            <el-option
              v-for="(item, index) in eliteSongClassify.DataList"
              :key="index"
              :label="item.Label"
              :value="item.Value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源路径" prop="VideoPath">
          <my-file-upload
            v-model="dialogUpdate.formData.VideoPath"
          ></my-file-upload>
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
  EliteSongInput,
  EliteSongOutput,
  EliteSongUpdInput
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
    const eliteSongClassify = reactive(new MyPageOutput<OptionOutput>());

    const dialogCreate = reactive<DialogData<EliteSongInput>>({
      show: false,
      formData: {} as EliteSongInput
    });
    const dialogUpdate = reactive<
      DialogEditData<EliteSongUpdInput, EliteSongOutput>
    >({
      show: false,
      formData: {} as EliteSongUpdInput,
      oldData: {} as EliteSongOutput
    });
    return {
      isLoad,
      eliteSongClassify,
      dialogCreate,
      dialogUpdate,
      rules
    };
  },
  methods: {
    async getData(match: string, page: PageInput<EliteSongOutput>) {
      page.TryAddSort("CreateTime", true);
      const filter: ObjFilterInput<EliteSongOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [
            { Compare: "contains", Field: "Name", Value: match },
            { Compare: "contains", Field: "Remark", Value: match }
          ]
        }
      };
      return apiEduAppResource.QueryPageEliteSong(filter);
    },
    /**加载爱利特儿歌分类 */
    async loadEliteSongClassify(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.eliteSongClassify.DataList.length === 0) {
          const input = new MyOptionFilterInput("eliteSongClassify");
          this.eliteSongClassify = await apiEduAppResource.QueryOption(input);
        }
      } finally {
        this.$closeLoading();
      }
    },
    /**打开编辑 */
    async edit(_index: number, row: EliteSongOutput): Promise<void> {
      await this.loadEliteSongClassify();
      this.dialogUpdate.oldData = row;
      this.dialogUpdate.formData = reactive({ ...row });
      this.dialogUpdate.show = true;
    },
    /**保存编辑 */
    async editSave(close: () => void): Promise<void> {
      try {
        this.$loading();
        await apiEduAppResource.UpdateEliteSong(
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
      await this.loadEliteSongClassify();
      this.dialogCreate.show = true;
      this.dialogCreate.formData = {} as EliteSongInput;
    },
    /**保存新增 */
    async createSave(close: () => void): Promise<void> {
      try {
        await this.$useRules("formCreate").validate();
        this.$loading();
        await apiEduAppResource.CreateEliteSong(this.dialogCreate.formData);
        close();
        this.isLoad = true;
      } finally {
        this.$closeLoading();
      }
    },
    /**删除并保存 */
    async deleteSave(_index: number, row: EliteSongOutput): Promise<void> {
      await apiEduAppResource.DeleteEliteSong(row.Pid, row.Timestamp);
      this.isLoad = true;
    }
  }
});
</script>
