<template>
  <div class="page-content">
    <div class="tips">
      <img src="@/assets/img/404.png" width="680" height="420" />
      <div class="right-wrap">
        <p>抱歉，您访问的页面不存在</p>
        <el-button type="primary" @click="goHomePage">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
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
