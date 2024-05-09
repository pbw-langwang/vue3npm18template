/**
 * 复制文本到粘贴板
 * 使用：import { copyTxt } from "@/utils/tools.js";
 *       copyTxt(`${copyUrl}/#/editform?password=${data.encodedCode}`);
 * @param {String} txt 需要粘贴的文本
 * @returns {Function}
 *
 */
export let copyTxt = (txt) => {
  // 惰性函数
  if (navigator.clipboard) {
    copyTxt = (txt) => {
      navigator.clipboard.writeText(txt)
    }
    copyTxt(txt)
  } else {
    copyTxt = (txt) => {
      const input = document.createElement('input')
      input.setAttribute('value', txt)
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    copyTxt(txt)
  }
}

/**
 * 防抖函数
 * @param {function} fn
 * @param {number} delay
 * @returns {function}
 * 如果函数有参数，直接定义一个常量等于debounce(fn,delay)
 * 调用的时候直接 常量(函数参数) 就行
 *
 */
export const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 对象按什么属性名和排序方式排序
 * @param {Array} arr 对象数组
 * @param {*} propertyName 属性名
 * @param {Array} order 排序方式
 * @returns {Array} 对象数组
 *
 */
export const Objsort = (arr, propertyName, order) => {
  return arr.sort((a, b) => {
    const indexA = order.indexOf(a[propertyName])
    const indexB = order.indexOf(b[propertyName])
    return indexA - indexB
  })
}

/**
 * 数组并集
 * @param {Array} arr 二维数组
 * @returns {Array} 一维数组
 *
 */
export const getUnion = (arr) => {
  return [...new Set(arr.flat())]
}

/**
 * 判断是否是微信浏览器
 * @returns {Boolean}
 */
export const isWxBrowser = () => {
  // 判断是否H5微信环境，true为微信浏览器
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false
}

/**
 * 下载工具
 * @param {string} url 下载地址
 * @param {string} name 文件名
 *
 */
export const downloadTool = (url, name = '') => {
  if (isWxBrowser()) {
    ElMessage({
      message: '请先在浏览器中打开再下载！',
      type: 'error'
    })
  } else {
    let a = document.createElement('a')
    a.style = 'display: none' // 创建一个隐藏的a标签
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click() // 触发a标签的click事件
    document.body.removeChild(a)
  }
}

/**
 * 判断是否相等
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 *
 */
export const isEqual = (a, b) => {
  if (a === b) return true
  if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false
  let keysA = Object.keys(a),
    keysB = Object.keys(b)
  if (keysA.length != keysB.length) return false
  for (let key of keysA) {
    if (!keysB.includes(key)) return false
    if (!isEqual(a[key], b[key])) return false
  }
  return true
}

/**
 * 获取数组中最长的一项的length
 * @param {Array} arr
 * @returns {Number}
 *
 */
export const getmaxleninArr = (arr) => {
  return Math.max(...arr.map((item) => item.length))
}

/**
 * 获取对象有值的属性
 * @param {Object} obj
 * @return {Array}
 *
 */
export const noEmptyKeys = (obj) => {
  if (obj instanceof Object) {
    const arr = Object.keys(obj).filter((key) => obj[key] !== null)
    return arr
  } else {
    throw {
      code: 500,
      msg: 'Please pass in an object!'
    }
  }
}

/**
 * 判断一个对象数组是否有重复的值
 * @param {Array} arr 对象数组
 * @return {boolean}
 *
 */
export const hasDuplicate = (arr) => {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const objStr = JSON.stringify(arr[i])
    if (map.has(objStr)) {
      return [map.get(objStr), i]
    } else {
      map.set(objStr, i)
    }
  }
  return false
}

/**
 * 截取字符串适配utf-16（使用码点而不是码元）
 * @param {String} string
 * @param {Number} pStart 开始位置
 * @param {Number} pEnd 结束位置
 * @return {String}
 *
 */
export const sliceByPoint = (string, pStart, pEnd) => {
  let result = ''
  let pIndex = 0 // 码点的指针
  let cIndex = 0 // 码元的指针
  // eslint-disable-next-line
  while (1) {
    if (pIndex >= pEnd || cIndex >= string.length) {
      break
    }
    const point = string.codePointAt(cIndex)
    if (pIndex >= pStart) {
      result += String.fromCodePoint(point)
    }
    pIndex++
    cIndex += point > 0xffff ? 2 : 1
  }
  return result
}
