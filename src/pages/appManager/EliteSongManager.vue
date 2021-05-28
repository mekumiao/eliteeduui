<template>
  <el-card>
    <el-card>
      <el-button-group>
        <el-button type="success" size="mini" @click="create">新增</el-button>
      </el-button-group>
    </el-card>
    <my-page-table
      :get-data="getData"
      v-model="isLoad"
      @edit="edit"
      @deleteSave="deleteSave"
    >
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="描述" prop="Remark"></el-table-column>
      <el-table-column label="资源路径" prop="VideoPath"></el-table-column>
      <el-table-column
        label="预览图"
        prop="PrviewPhoto"
        min-width="150"
        align="center"
      >
        <template #default="scope">
          <el-image
            v-if="scope.row.PrviewPhoto"
            style="width: 100px"
            fit="contain"
            :src="'http://file.linshengweb.com/files/' + scope.row.PrviewPhoto"
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
    title="新增爱利特儿歌"
    width="60%"
    v-model="dialogCreate.show"
    @save="createSave"
  >
    <el-form :model="dialogCreate.formData" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="dialogCreate.formData.Name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dialogCreate.formData.Remark" />
      </el-form-item>
      <el-form-item label="儿歌分类">
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
      <el-form-item label="资源路径">
        <el-input v-model="dialogCreate.formData.VideoPath" />
        <my-file-upload
          v-model="dialogCreate.formData.VideoPath"
        ></my-file-upload>
      </el-form-item>
      <el-form-item label="预览图">
        <my-image-upload
          v-model="dialogCreate.formData.PrviewPhoto"
        ></my-image-upload>
      </el-form-item>
    </el-form>
  </app-dialog>

  <app-dialog
    title="修改爱利特儿歌"
    width="60%"
    v-model="dialogUpdate.show"
    @save="editSave"
  >
    <el-form :model="dialogUpdate.formData" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="dialogUpdate.formData.Name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dialogUpdate.formData.Remark" /> </el-form-item
      ><el-form-item label="儿歌分类">
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
      <el-form-item label="资源路径">
        <el-input v-model="dialogUpdate.formData.VideoPath" />
        <my-file-upload
          v-model="dialogUpdate.formData.VideoPath"
        ></my-file-upload>
      </el-form-item>
      <el-form-item label="预览图">
        <my-image-upload
          v-model="dialogUpdate.formData.PrviewPhoto"
        ></my-image-upload>
      </el-form-item>
    </el-form>
  </app-dialog>
</template>

<script lang="ts">
import {
  ObjFilterInput,
  OptionFilterInput,
  OptionOutput,
  PageInput,
  PageOutput
} from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent, reactive, ref } from "vue";
import {
  apiAppResourceManagerApi,
  EliteSongInput,
  EliteSongOutput,
  EliteSongUpdInput
} from "@/apis/appResourceManagerApi";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import AppDialog from "@/components/AppDialog.vue";
import { DialogData, DialogEditData } from "@/types/el-dialog";
import MyImageUpload from "@/components/MyImageUpload.vue";
import MyFileUpload from "@/components/MyFileUpload.vue";

export default defineComponent({
  components: {
    MyPageTable,
    MyPageTableColumnBase,
    AppDialog,
    MyImageUpload,
    MyFileUpload
  },
  name: "EliteSongManager",
  setup() {
    const isLoad = ref(true);
    const eliteSongClassify = reactive(new PageOutput<OptionOutput>());

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

    return { isLoad, eliteSongClassify, dialogCreate, dialogUpdate };
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<unknown>
    ): Promise<PageOutput<unknown>> {
      try {
        this.$loading();
        const filter: ObjFilterInput<EliteSongOutput> = {
          Page: page,
          Condition: {
            Logic: "or",
            Items: [{ Compare: "contains", Field: "Name", Value: match }]
          }
        };
        return apiAppResourceManagerApi.QueryPageEliteSong(filter);
      } finally {
        this.$closeLoading();
      }
    },
    /**加载爱利特儿歌分类 */
    async loadEliteSongClassify(flag?: boolean): Promise<void> {
      try {
        this.$loading();
        if (flag || this.eliteSongClassify.DataList.length === 0) {
          const input = new OptionFilterInput("eliteSongClassify");
          this.eliteSongClassify = await apiAppResourceManagerApi.QueryOption(
            input
          );
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
    async editSave(): Promise<void> {
      await apiAppResourceManagerApi.UpdateEliteSong(
        this.dialogUpdate.oldData.Pid,
        this.dialogUpdate.oldData.Timestamp,
        this.dialogUpdate.formData
      );
      this.isLoad = true;
    },
    /**打开新增 */
    async create(): Promise<void> {
      await this.loadEliteSongClassify();
      this.dialogCreate.show = true;
      this.dialogCreate.formData = {} as EliteSongInput;
    },
    /**保存新增 */
    async createSave(): Promise<void> {
      await apiAppResourceManagerApi.CreateEliteSong(
        this.dialogCreate.formData
      );
      this.isLoad = true;
    },
    /**删除并保存 */
    async deleteSave(_index: number, row: EliteSongOutput): Promise<void> {
      await apiAppResourceManagerApi.DeleteEliteSong(row.Pid, row.Timestamp);
      this.isLoad = true;
    }
  }
});
</script>
