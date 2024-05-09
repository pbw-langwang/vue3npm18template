<script setup>
const route = useRoute()
watch(
  () => route.path,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  { immediate: true }
)

onMounted(() => {
  // 监听页面关闭事件
  window.addEventListener('beforeunload', function (event) {
    // 计算页面停留时间（以毫秒为单位）
    const stayTime = new Date() - localStorage.getItem('lastPageTime')

    let _formdata = {}
    _formdata.url = route.path
    _formdata.time = stayTime
    console.log(_formdata)

    // 确保关闭页面时不会阻止默认行为
    delete event.preventDefault()
  })
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
@font-face {
  font-family: 'Bear-hard-candy';
  src: url('@/assets/font/Bear-hard-candy-2.ttf');
  font-weight: normal;
  font-style: normal;
}
#app {
  height: 100%;
  font-family: Bear-hard-candy;
}
</style>
