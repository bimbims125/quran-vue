import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: ()=>import('../views/Index.vue')
  },
  {
    path: '/surah/:id',
    name: 'surah',
    component: ()=>import('../views/Surah.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
