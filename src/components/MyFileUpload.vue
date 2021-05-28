<template>
  <div>文件上传组件</div>
  <div>{{ fileUrl }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyFileUpload",
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: String, default: "" }
  },
  setup(props) {
    const fileUrl = ref<string | undefined>("");
    if (props.modelValue) {
      fileUrl.value = props.modelValue;
    }
    return { fileUrl };
  },
  methods: {}
});
</script>
