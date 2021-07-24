<template>
  <el-cascader
    v-model="selected"
    :options="dataOptions"
    :props="myProps"
    placeholder="请选择班级"
    @change="change"
    clearable
  ></el-cascader>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { apiEduClassInfo } from "@/apis/eduClassInfoApi";
import { MyOptionFilterInput } from "@/utils/my-apiClass";

const myProps = reactive({
  multiple: true,
  value: "Value",
  label: "Label",
  children: "Children",
  disabled: "Disabled"
});

export default defineComponent({
  name: "MyClassInfoCascader",
  emits: ["update:modelValue"],
  props: {
    school: { type: String as PropType<string>, default: "0" },
    modelValue: {
      type: Array as PropType<Array<string>>,
      default: () => []
    }
  },
  async mounted() {
    if (this.school) {
      const pageOption = await this.getPageOption(this.school);
      this.dataOptions = pageOption.DataList;
      const array: Array<Array<string>> = [];
      for (const schoolItem of this.dataOptions) {
        for (const classItem of schoolItem.Children) {
          if (this.modelValue.some((x) => x == classItem.Value)) {
            array.push([schoolItem.Value as string, classItem.Value as string]);
          }
        }
      }
      this.selected.push(...array);
    }
  },
  setup() {
    const selected = ref<Array<Array<string>>>([]);
    const dataOptions = ref<Array<CascaderOptionItem>>();
    return { selected, myProps, dataOptions };
  },
  watch: {
    async school(newValue) {
      if (newValue) {
        const pageOption = await this.getPageOption(newValue);
        this.dataOptions = pageOption.DataList;
      }
    }
  },
  methods: {
    async getPageOption(
      schoolId: string
    ): Promise<PageOutput<CascaderOptionItem>> {
      const filter = new MyOptionFilterInput("grade-class-filterByRole");
      filter.Cascade = schoolId;
      return await apiEduClassInfo.QueryOption(filter);
    },
    change() {
      const array = this.selected.filter((x) => x.length == 2).map((x) => x[1]);
      this.$emit("update:modelValue", array);
    }
  }
});
</script>
