<template>
  <el-popover placement="top" :width="160" v-model:visible="show">
    <p>{{ msgTxt }}</p>
    <div style="text-align: right; margin: 0">
      <el-button type="text" size="mini" @click="show = false">
        取消
      </el-button>
      <el-button type="danger" plain size="mini" @click="confirmCall">
        确定
      </el-button>
    </div>
    <template #reference>
      <el-button type="danger" plain size="mini" @click="show = true">
        {{ btnTxt }}
      </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**带确认框的按钮组件 */
export default defineComponent({
  name: "AppButtonPopover",
  emits: ["confirm"],
  props: {
    btnTxt: { type: String, default: "删除" },
    msgTxt: { type: String, default: "确定要删除吗?" }
  },
  data() {
    return { show: false };
  },
  methods: {
    confirmCall(): void {
      this.show = false;
      this.$emit("confirm");
    }
  }
});
</script>
