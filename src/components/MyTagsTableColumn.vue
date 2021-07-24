<template>
  <el-table-column :label="label" min-width="150px">
    <template #default="scope">
      <el-space wrap :size="5">
        <el-tag
          type="success"
          effect="dark"
          v-for="(item, idx) in scope.row[prop]"
          :key="idx"
        >
          {{ getValue(item) }}
        </el-tag>
        <el-tag type="info" effect="dark" v-if="scope.row.Roles.length === 0">
          无
        </el-tag>
      </el-space>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MyTagsTableColumn",
  props: {
    label: { type: String as PropType<string>, required: true },
    prop: { type: String as PropType<string>, required: true },
    itemName: { type: String as PropType<string>, default: "" }
  },
  setup() {
    return {};
  },
  methods: {
    getValue(item: Record<string, unknown>) {
      if (this.itemName) {
        return item[this.itemName];
      } else {
        return item;
      }
    }
  }
});
</script>
