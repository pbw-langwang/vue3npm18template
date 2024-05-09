/**
 * 自定js函数重载
 * 使用：import { addMethod } from '@/hooks/useOverloadFun.js'
 *       addMethod(object,'xxx',(args)=>{})
 * @param {Object} object
 * @param {String} name
 * @param {Function} fn
 */
export function addMethod(object, name, fn) {
  const old = object[name]
  object[name] = function (...args) {
    // fn.length 可以获取函数多少个参数
    if (args.length === fn.length) {
      return fn.apply(this.args)
    } else if (typeof old === 'function') {
      return old.apply(this, args)
    }
  }
}
