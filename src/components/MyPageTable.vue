<template>
  <el-table
    ref="pageTable"
    v-loading="loading"
    :data="pageData.DataList"
    :max-height="maxHeight"
    @sort-change="sortChange"
    @selection-change="$emit('selectionChange', $event)"
  >
    <el-table-column v-if="showCheckBox" type="selection"></el-table-column>
    <el-table-column
      v-if="showIndex"
      label="序号"
      type="index"
    ></el-table-column>
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
              @confirm="$emit('deleteSave', scope.$index, scope.row)"
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
      :current-page="page.Index"
      :page-sizes="[10, 20, 50]"
      :page-size="page.Size"
      :pager-count="5"
      :layout="'total, sizes, prev, pager, next, jumper'"
      :total="pageData.Total"
      background
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
  emits: ["update:modelValue", "edit", "deleteSave"],
  props: {
    searchWidth: { type: [String, Number], default: 190 },
    maxHeight: {
      type: [String, Number],
      default: () => {
        const max = window.innerHeight - 300;
        return max < 300 ? 300 : max;
      }
    },
    modelValue: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: true },
    showCheckBox: { type: Boolean, default: true },
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
    const loading = ref(false);
    const search = ref("");
    const page = reactive(new PageInput<unknown>());
    let pageData = ref(new PageOutput<unknown>());
    watch(
      () => props.modelValue,
      async (newValue: boolean) => {
        if (newValue) {
          try {
            loading.value = true;
            if (props.getData) {
              pageData.value = await props.getData(
                search.value,
                new PageInput(page.Index, page.Size, page.Sorts)
              );
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
      this.$emit("update:modelValue", false);
      this.loading = true;
      await sleep();
      try {
        if (this.getData) {
          this.pageData = await this.getData(
            this.search,
            new PageInput(this.page.Index, this.page.Size, this.page.Sorts)
          );
        }
      } finally {
        this.loading = false;
      }
    },
    /**分页大小变化 */
    async sizeChange(size: number): Promise<void> {
      this.page.Size = size;
      this.loadData();
    },
    /**当前页码变化 */
    async currentChange(index: number): Promise<void> {
      this.page.Index = index;
      this.loadData();
    },
    /**排序变化 */
    async sortChange(sort: SortTableColumn): Promise<void> {
      const desc = sort.order === "descending" ? true : false;
      if (sort.order) {
        const obj = { Orderby: sort.prop, Desc: desc } as SortInput<unknown>;
        this.page.Sorts = [obj];
      } else {
        this.page.Sorts = [];
      }
      this.loadData();
    }
  }
});
</script>
