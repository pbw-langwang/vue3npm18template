<script setup>
import menuItem from './menuItem.vue'

const props = defineProps({
  // 打开的菜单
  openmenu: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 菜单内容
  menucontent: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 控制是否只打开一个
  openone: {
    type: Boolean,
    default: false
  },
  // 控制横向竖向
  mode: {
    type: String,
    default: 'vertical'
  }
})
console.log(props)

const emit = defineEmits(['menuSelect'])
const menuSelect = (e) => {
  emit('menuSelect', e)
}
</script>

<template>
  <el-menu
    class="elMenu"
    ref="elMenu"
    :router="true"
    :unique-opened="openone"
    :default-openeds="openmenu"
    :default-active="openmenu[0]"
    :mode="mode"
    @select="menuSelect"
    :ellipsis="false"
  >
    <!-- 递归动态菜单 -->
    <menuItem :menudata="menucontent"></menuItem>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
