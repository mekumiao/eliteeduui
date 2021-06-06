<template>
  <div class="welcome">
    <el-card>
      <div ref="myChart" style="width: 100%; height: 500px"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import * as echarts from "echarts";

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
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
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
  mounted() {
    if (this.myChart) {
      const myChart = echarts.init(this.myChart);
      myChart.setOption(this.option);
    }
  }
});
</script>

<style lang="scss" scoped>
.welcome {
  width: 95%;
  height: 95%;
}
</style>
