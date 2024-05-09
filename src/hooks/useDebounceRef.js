/**
 * 自定义防抖ref
 * 使用：import { MydebouncedRef } from '@/hooks/useDebounceRef.js'
 *       let debounceval = MydebouncedRef('111', 1000)
 *       <input type="text" v-model="debounceval" />
 *       <p>{{ debounceval }}</p>
 * @param {*} value
 * @param {Number} duration
 * @returns {customRef}
 */
export function MydebouncedRef(value, duration = 1000) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val) {
        clearInterval(timer)
        timer = setTimeout(() => {
          trigger()
          value = val
        }, duration)
      }
    }
  })
}
