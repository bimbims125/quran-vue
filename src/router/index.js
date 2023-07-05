import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/surah/:id',
    name: 'surah',
    component: () => import('../views/Surah.vue')
  },
  // Rute terakhir sebagai fallback
  {
    path: '/404',
    name: '404',
    component: () => import('../components/404Notfound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
