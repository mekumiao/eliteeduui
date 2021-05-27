<template>
  <el-table
    :data="pageData.DataList"
    :height="height"
    v-loading="loading"
    :max-height="maxHeight || 520"
    @sort-change="sortChange"
    @selection-change="$emit('selectionChange', $event)"
  >
    <el-table-column v-if="showCheckBox" type="selection" />
    <el-table-column v-if="showIndex" label="序号" type="index" />
    <slot></slot>
    <my-page-table-column-search
      v-if="showSearch"
      v-model="search"
      @search="loadData"
      :width="searchWidth"
    >
      <template #default="scope">
        <slot name="button" v-bind="{ row: scope.row, $index: scope.$index }">
          <el-button-group>
            <el-button
              plain
              size="mini"
              type="primary"
              @click="$emit('edit', scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <app-button-popover
              @confirm="$emit('remove', scope.$index, scope.row)"
            ></app-button-popover>
          </el-button-group>
        </slot>
      </template>
    </my-page-table-column-search>
  </el-table>
  <div style="margin-top: 20px">
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="page.index"
      :page-sizes="[10, 30, 50]"
      :page-size="page.size"
      :pager-count="5"
      background
      :layout="'total, sizes, prev, pager, next, jumper'"
      :total="pageData.Total"
    />
  </div>
</template>

<script lang="ts">
import { PageInput, PageOutput, SortInput } from "@/apis/apiBase";
import { sleep } from "@/utils/my-thread";
import { PropType, reactive, ref, watch } from "vue";
import { SortTableColumn } from "@/types/el-rules";
import { defineComponent } from "vue";
import MyPageTableColumnSearch from "./MyPageTableColumnSearch.vue";
import AppButtonPopover from "./AppButtonPopover.vue";

export default defineComponent({
  components: { MyPageTableColumnSearch, AppButtonPopover },
  name: "MyPageTable",
  emits: ["update:modelValue"],
  props: {
    searchWidth: { type: [String, Number], default: "" },
    height: { type: [String, Number], default: "" },
    maxHeight: { type: [String, Number], default: "" },
    modelValue: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: true },
    showCheckBox: { type: Boolean, default: false },
    showIndex: { type: Boolean, default: true },
    getData: {
      type: Function as PropType<
        (
          match: string,
          page: PageInput<unknown>
        ) => Promise<PageOutput<unknown>>
      >,
      required: true
    }
  },
  setup(props, context) {
    debugger;
    const loading = ref(false);
    const search = ref("");
    const page = reactive(new PageInput<unknown>());
    let pageData = reactive(new PageOutput<unknown>());
    watch(
      () => props.modelValue,
      async (newValue: boolean) => {
        if (newValue) {
          try {
            loading.value = true;
            await sleep();
            if (props.getData) {
              pageData = await props.getData(search.value, page);
            }
          } finally {
            loading.value = false;
            context.emit("update:modelValue", false);
          }
        }
      }
    );
    return { loading, search, page, pageData };
  },
  mounted(): void {
    this.modelValue && this.loadData();
  },
  methods: {
    /**加载数据 */
    async loadData(): Promise<void> {
      debugger;
      this.$emit("update:modelValue", false);
      this.loading = true;
      await sleep();
      try {
        if (this.getData) {
          this.pageData = await this.getData(this.search, this.page);
        }
      } finally {
        this.loading = false;
      }
    },
    /**分页大小变化 */
    async sizeChange(size: number): Promise<void> {
      debugger;
      this.page.Size = size;
      this.loadData();
    },
    /**当前页码变化 */
    async currentChange(index: number): Promise<void> {
      debugger;
      this.page.Index = index;
      this.loadData();
    },
    /**排序变化 */
    async sortChange(sort: SortTableColumn): Promise<void> {
      debugger;
      const desc = sort.order === "descending" ? true : false;
      if (sort.order) {
        const obj = { Orderby: sort.prop, Desc: desc } as SortInput<unknown>;
        this.page.Sorts = [obj];
      } else {
        this.page.Sorts = undefined;
      }
      this.loadData();
    }
  }
});
</script>
