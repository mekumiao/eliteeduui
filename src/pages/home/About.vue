<template>
  <div class="about">
    <h1>关于爱利特教务系统</h1>
    <el-button-group>
      <el-button @click="show">弹出</el-button>
      <el-button @click="close">关闭</el-button>
    </el-button-group>
    <div class="dialogLayerTest">
      <div>xxxxx</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DialogElementLayer } from "@/plugins/my-dialogLayer";

export default defineComponent({
  name: "About",
  setup() {
    const dialog = new DialogElementLayer("dialogLayerTest");
    return { dialog };
  },
  methods: {
    show() {
      this.dialog?.Show();
    },
    close() {
      this.dialog?.Close();
    }
  }
});
</script>
