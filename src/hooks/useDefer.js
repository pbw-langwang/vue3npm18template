/**
 * 封装解决白屏问题（首次加载东西太多的情况）
 * 使用：import { useDefer } from '@/hooks/useDefer.js'
 *       const defer = useDefer()
 *       <div v-for="n in 100">
 *         <难以渲染的组件 v-if="defer(n)"></难以渲染的组件>
 *       </div>
 * @param {Number} max
 * @returns {Function}
 */
export function useDefer(max = 100) {
  const frameCount = ref(0)
  let rafId
  // 刷新帧数
  function updateFrameCount() {
    rafId = requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value >= max) {
        return
      }
      updateFrameCount()
    })
  }
  updateFrameCount()
  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })
  return function defer(n) {
    return frameCount.value >= n
  }
}
