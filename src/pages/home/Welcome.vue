﻿<template>
  <div class="welcome">
    <el-card>
      <div ref="myChart" style="width: 100%; height: 500px"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { getEchartsAsync } from "@/plugins/my-asyncComponent";

const option = reactive({
  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "5%",
    left: "center"
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: "今日访问" },
        { value: 580, name: "VIP用户" },
        { value: 484, name: "发布作业" },
        { value: 300, name: "题库数量" }
      ]
    }
  ]
});

export default defineComponent({
  name: "Welcome",
  setup() {
    const myChart = ref<HTMLElement>();
    return { option, myChart };
  },
  async mounted() {
    const echarts = await getEchartsAsync();
    if (this.myChart) {
      const chart = echarts.init(this.myChart);
      chart.setOption(this.option);
    }
  }
});
</script>

<style lang="scss" scoped></style>
