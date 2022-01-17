import {
    createRouter,
    createWebHashHistory
  } from 'vue-router'
  
  const routes = [{
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/index.vue')
    },
    {
        path: '/page1',
        name: 'Page1',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/page1.vue')
      },
  
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router