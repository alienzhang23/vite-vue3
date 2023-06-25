import {
    createRouter,
    createWebHashHistory
  } from 'vue-router'
  
  const routes = [{
        path: '/',
        name: 'Index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/index.vue'),
        meta: {
          title: "",
          keepAlive:false
        },
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/login.vue'),
        meta: {
          title: "",
          keepAlive:false
        },
      },
      {
        path: "/list", //列表页
        name: "List",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/list.vue"),
          meta: {
            title: "",
            keepAlive:true
          },
      },
      {
        path: "/detail", //列表页
        name: "Detail",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/detail.vue"),
          meta: {
            title: "",
            keepAlive:false
          },
      },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router