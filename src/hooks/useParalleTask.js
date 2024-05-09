/**
 * 封装控制并发量的函数
 * 使用：import { paralleTask } from '@/hooks/useParalleTask.js'
 *       paralleTask(任务队列,num).then(()=> {})
 * @param {Function[]} tasks 并发任务
 * @param {Number} paralleCount 并发数量
 * @returns {Promise}
 */

export function paralleTask(tasks, paralleCount = 4) {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    if (tasks.length == 0) {
      resolve()
      return
    }
    let nextIndex = 0 // 记录下一个任务的下标
    let finishCount = 0 // 记录完成的任务数量
    // 运行下一个任务
    function _run() {
      const task = tasks[nextIndex]
      nextIndex++
      task().then(() => {
        finishCount++
        if (nextIndex < tasks.length) {
          // 运行下一个
          _run()
        } else if (finishCount === tasks.length) {
          // 运行完成
          resolve()
        }
      })
    }
    for (let i = 0; i < paralleCount && i < tasks.length; i++) {
      _run()
    }
  })
}
