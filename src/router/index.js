// 创建一个路由器，并暴露出去
// 第一步：引入
import { createRouter, createWebHashHistory } from 'vue-router'

// 第二步，自动生成routes，使用vite里面的glob
let cacheSet = new Set()
const routes = []
const pageModules = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
})
const compModules = import.meta.glob('../views/**/index.vue')
Object.entries(pageModules)
  // 将子路由排在父路由后面，不然加不上去
  .sort((a, b) => {
    if (a[0].split('/').length > b[0].split('/').length) {
      return 1
    } else {
      return -1
    }
  })
  // 自己设置index判断哪个子路由是重定向的
  .sort((a, b) => {
    if (a[1].index && b[1].index) {
      if (a[1].index > b[1].index) {
        return -1
      } else {
        return 1
      }
    } else {
      return 0
    }
  })
  .map(([pagePath, config]) => {
    // 分两种情况,如果是子路由就加入children,父路由则重新建一个
    const path = pagePath.replace('../views', '').replace('/page.js', '') || '/'
    let r = path.split('/')[1]
    let redirect = path.split('/')[2]
    if (cacheSet.has(r)) {
      const path = pagePath
        .replace('../views', '')
        .replace('/page.js', '')
        .replace('/' + r, '')
      const name = path.split('/').filter(Boolean).join('-')
      const compPath = pagePath.replace('page.js', 'index.vue')
      for (let i of routes) {
        if (i.name === r) {
          i.redirect = redirect
          i.children.push({
            path,
            name,
            component: compModules[compPath],
            mate: config
          })
        }
      }
    } else {
      const name = path.split('/').filter(Boolean).join('-') || 'index'
      const compPath = pagePath.replace('page.js', 'index.vue')
      cacheSet.add(r)
      routes.push({
        path,
        name,
        component: compModules[compPath],
        mate: config,
        children: []
      })
    }
  })
routes.push(
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
)
console.log(`output->routes`, routes)
cacheSet.clear()

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

let _startTime = Date.now()
localStorage.setItem('lastPageTime', _startTime)
let _currentTime

router.beforeEach((to, from) => {
  console.log(to, from)
  if (to) {
    // 第一步：页面跳转后记录一下当前的时间 currentTime
    _currentTime = Date.now()
    // 第二步：通过计算currentTime - startTime 的差值，再上报数据
    let _formdata = {}
    _formdata.url = from.path
    _formdata.time = _currentTime - _startTime
    console.log(_formdata)
    // 第三步：每次都要初始化一下 startTime
    _startTime = Date.now()
    localStorage.setItem('lastPageTime', _startTime)
  }
  if (to.matched.length > 0) {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login' && !to.path.includes('/editform')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next('/login')
  }
})

export default router
