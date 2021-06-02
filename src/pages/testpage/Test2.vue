<template>
  <div class="test2">
    {{ sex }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Test2",
  setup() {
    const sex = ref("男");
    return { sex };
  }
});
</script>
