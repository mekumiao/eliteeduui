<template>
  <div class="MyUserInfoSearch">
    <el-popover
      :placement="placement"
      trigger="click"
      width="60%"
      v-model:visible="isShow"
    >
      <template #reference>
        <el-button plain type="warning" size="mini">{{ buttonText }}</el-button>
      </template>
      <my-page-table
        v-model="isLoad"
        :get-data="getData"
        :show-check-box="false"
        @rowClick="rowClick"
        @rowdblClick="rowdblClick"
      >
        <el-table-column label="姓名" prop="FullName"></el-table-column>
        <el-table-column label="昵称" prop="NickName"></el-table-column>
        <el-table-column label="手机号" prop="Phone"></el-table-column>
        <my-gender-table-column></my-gender-table-column>
        <template #button="scope">
          <el-button type="success" size="mini" @click="selected(scope.row)">
            选择
          </el-button>
        </template>
      </my-page-table>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { apiAdminUserInfo, UserInfoOutput } from "@/apis/adminUserInfoApi";
import { defineComponent, PropType, ref } from "vue";

export declare type PlacementType =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export default defineComponent({
  name: "MyUserInfoSearch",
  emits: ["update:modelValue", "change"],
  props: {
    placement: {
      type: String as PropType<PlacementType>,
      default: "right-start"
    },
    modelValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined
    }
  },
  setup() {
    const isShow = ref(false);
    const isLoad = ref(true);
    const checkedUser = ref<UserInfoOutput>();
    return { isLoad, checkedUser, isShow };
  },
  computed: {
    buttonText(): string {
      if (this.checkedUser) {
        return `${this.checkedUser.FullName}(${this.checkedUser.Phone})`;
      } else {
        return "请选择用户";
      }
    }
  },
  methods: {
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
      return apiAdminUserInfo.QueryPageNotTeacher(filter);
    },
    selected(row: UserInfoOutput): void {
      this.isShow = false;
      this.checkedUser = row;
      this.$emit("update:modelValue", row.Pid);
      this.$emit("change", row);
    },
    rowClick(row: UserInfoOutput): void {
      this.checkedUser = row;
      this.$emit("update:modelValue", row.Pid);
      this.$emit("change", row);
    },
    rowdblClick(row: UserInfoOutput): void {
      this.selected(row);
    }
  }
});
</script>
