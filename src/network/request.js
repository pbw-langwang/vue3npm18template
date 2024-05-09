// 对你引用的第三方网络请求框架进行封装
import axios from 'axios'
import router from '@/router'
import i18n from '@/i18n/i18n'
const { t } = i18n.global

function signout() {
  localStorage.removeItem('token')
  localStorage.removeItem('Auth')
  router.replace({
    path: '/'
  })
}

export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    timeout: 30000
  })
  //2. 使用axios拦截器
  //2.1 请求拦截
  instance.interceptors.request.use(
    (conF) => {
      //如果不返回,则真正的请求被拦截了,用户就会打印err
      // *** 一般进行的操作 ***
      // 1. config中的一些信息不符合服务器要求,就可以在这修改,在创建实例时也可以
      // 2. 每次发送网络请求时,都希望在界面中显示一个请求的图标
      // 3. 某些网络请求(登陆[token]),必须携带一些特殊的信息
      //    解释:判断请求是什么,如果是特殊的请求,就看看里面有没有token,要是没有,就让其去登陆
      // console.log(conF);
      const token = localStorage.getItem('token')
      // console.log(token);
      token ? (conF.headers.token = token) : null
      // 剔除不需要 token 的接口
      if (conF.url.includes('/xxx')) {
        conF.headers.token = null
      }
      return conF
    },
    (err) => {
      console.log(err)
      ElMessage({
        showClose: true,
        message: err
      })
    }
  )
  //2.2 响应拦截
  instance.interceptors.response.use(
    (res) => {
      console.log(res)
      //更新token
      if (res.status == 200) {
        if (res.headers?.token) {
          localStorage.setItem('token', res.headers.token)
        }
      }
      if (res.data.code) {
        switch (res.data.code) {
          // 401: 未登录
          case 401:
            ElMessage({
              showClose: true,
              message: t('401err')
            })
            signout()
            break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token对象
          // 跳转登录页面
          case 403:
            ElMessage({
              showClose: true,
              message: t('403err')
            })
            signout()
            break
          // 404请求不存在
          case 404:
            ElMessage({
              showClose: true,
              message: t('404err')
            })
            break
          case 500:
            ElMessage({
              showClose: true,
              message: t('500err')
            })
            break
          // 其他错误，直接抛出错误提示
          default:
            ElMessage({
              showClose: true,
              message: res.data.message || res.message
            })
        }
      }
      return res.data
    },
    (error) => {
      console.log(error)
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          case 401:
            ElMessage({
              showClose: true,
              message: t('401err')
            })
            signout()
            break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token对象
          // 跳转登录页面
          case 403:
            ElMessage({
              showClose: true,
              message: t('403err')
            })
            signout()
            break
          // 404请求不存在
          case 404:
            ElMessage({
              showClose: true,
              message: t('404err')
            })
            break
          case 500:
            ElMessage({
              showClose: true,
              message: t('500err')
            })
            break
          // 其他错误，直接抛出错误提示
          default:
            ElMessage({
              showClose: true,
              message: error.response.data.message || error.response.message
            })
        }
        return Promise.reject(error.response)
      } else {
        console.log(error)
        ElMessage({
          showClose: true,
          message: t('err')
        })
      }
    }
  )
  //3. 真正的发送请求
  return instance(config)
}
