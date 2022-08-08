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
        component: () => import( /* webpackChunkName: "about" */ '../views/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
      },
  
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router