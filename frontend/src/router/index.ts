import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/CustomerView.vue')
    },
    {
      path: '/manage',
      name: 'counter-management',
      component: () => import('../views/CounterManagementView.vue')
    }
  ]
})

export default router
