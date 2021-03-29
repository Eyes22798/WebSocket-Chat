import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
          import(/* webpackChunkName: "About" */ "../components/About.vue")
  },
  {
    path: "/",
    name: 'Layout',
    meta: {
        title: '首页',
        keepAlive: true,
    },
    component: () => import('../layout/index.vue')
  }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
