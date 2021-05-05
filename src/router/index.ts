import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { store } from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/chat',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/layout/index.vue"),
    redirect: '/chat/home',
    meta: {
      requiresAuth: true,
      keepAlive: true
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/index.vue"),
        meta: {
          requiresAuth: true,
          keepAlive: true,
          deepth: 1
        },
      },
    ],
  },
  {
    path: "/login",
    name: 'Login',
    meta: {
        title: '登录',
        keepAlive: true,
        deepth: 0.5
    },
    component: () => 
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue")
  },
  {
    path: "/404",
    name: 'NotFound',
    component: () => 
      import(/* webpackChunkName: "404" */ "@/views/404.vue")
  }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
  /**tips:需要在钩子函数内读取登录状态 */
  const userIsLogin = store.state.user.isLogin
  if(to.meta.requiresAuth){
    if(userIsLogin){
      next()
    }else{
      // alert('请先登录再进行此操作!')
      next({
        path: '/login',
        /** 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由 */
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next()
  }
})

export default router
