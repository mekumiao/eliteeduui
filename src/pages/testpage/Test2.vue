<template>
  <div class="test2">
    <el-card>
      <el-button @click="number++">累加{{ number }}</el-button>
      <my-customer-file-upload></my-customer-file-upload>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { number } from "@/components/MyCustomerFileUpload.vue";

export default defineComponent({
  name: "Test2",
  setup() {
    return { number };
  }
});
</script>
