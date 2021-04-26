<template>
  <div class="about">
    <h1>关于爱丽特教务系统</h1>
    <el-button @click="showMsg">显示消息</el-button>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: { type: String as PropType<string>, default: "" }
  },
  methods: {
    showMsg(): void {
      console.log(this.$props.msg);
    }
  }
});
</script>
