<script setup>
const props = defineProps({
  menudata: {
    type: Array,
    default: () => {
      return []
    }
  }
})
console.log(props)
</script>

<template>
  <template v-for="(item, index) in menudata">
    <template v-if="item?.children?.length > 0">
      <el-sub-menu :key="index" :index="item.path">
        <template #title>
          <el-icon v-if="item.icon">
            <span class="iconfont" :class="item.icon"></span>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <menuItem :menudata="item.children"></menuItem>
      </el-sub-menu>
    </template>

    <template v-else>
      <el-menu-item :index="item.path" :key="index + '1'">
        <el-icon v-if="item.icon">
          <span class="iconfont" :class="item.icon"></span>
        </el-icon>
        <template #title>
          {{ item.name }}
          <span class="hotBox" v-if="item.hot">
            <img src="~@/assets/images/huo.png" alt="hot.png" />
          </span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item[tabindex~='0'] {
  font-size: 18px;
}
.hotBox {
  margin-left: 10px;
  width: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
</style>
<style>
.el-menu--popup {
  min-width: 100px;
}
</style>
