﻿<template>
  <div class="page-content">
    <div class="tips">
      <img src="@/assets/img/403.png" width="680" height="420" />
      <div class="right-wrap">
        <p>抱歉，您无权访问该页面</p>
        <el-button type="primary" @click="goHomePage">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "403",
  methods: {
    goHomePage() {
      this.$router.push("/");
    }
  }
});
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;

  .tips {
    width: 630px;
    margin: auto;
    margin-top: 25vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 300px;
      height: 180px;
    }

    .right-wrap {
      p {
        color: #808695;
        font-size: 20px;
        line-height: 28px;
      }

      .el-button {
        margin-top: 20px;
      }
    }
  }
}
</style>
