import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        component: () => import('../views/loginView.vue')
      },
      {
        path: '/signup',
        component: () => import('../views/signupView.vue')
      }
    ]
  },
  {
    path: '/todolist',
    component: () => import('../views/todolistView.vue')
  },
  {
    path: '/week-2',
    component: () => import('../views/week-2.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
