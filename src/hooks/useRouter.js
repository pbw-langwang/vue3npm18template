/**
 * 路由跳转封装
 * 使用：import { useMyRouter } from '@/hooks/useRouter.js'
 *       let { router, route, toPath } = useMyRouter()
 *       toPath('/xxxx')
 */
export function useMyRouter() {
  const router = useRouter()
  const route = useRoute()

  // 跳转路由
  function toPath(path) {
    if (route.path !== path.path) {
      //判断当前路径与跳转路径是否相同
      router.push(path)
    }
  }

  return { router, route, toPath }
}
