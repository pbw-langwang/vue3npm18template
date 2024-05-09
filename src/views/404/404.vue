<template>
  <div class="wrapper">
    <div class="http404-container">
      <img class="pic" src="@/assets/404/2.png" alt="" />
      <div class="title">抱歉，您要访问的页面不存在</div>
      <div class="desc">请检查您输入的网址是否正确，请点击以下按钮返回首页</div>
      <el-button type="primary" @click="handleBack"> 返回首页 </el-button>
    </div>
  </div>
</template>

<script setup>
import { useMyRouter } from '@/hooks/useRouter.js'
let { toPath } = useMyRouter()
const handleBack = () => {
  toPath('/home')
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100vh;
}

.http404-container {
  position: relative;
  top: 50%;
  text-align: center;
  transform: translateY(-80%);

  .pic {
    width: 185px;
  }

  .title {
    width: 100%;
    margin-top: 40px;
    font-size: 26px;
  }

  .desc {
    width: 100%;
    margin-top: 12px;
    font-size: 14px;
    color: #555;
    text-align: center;
  }

  .el-button {
    margin-top: 24px;
  }
}
</style>
