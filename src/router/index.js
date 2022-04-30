import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loadingSesion = true
  const user = await userStore.currentUser()
  // if (user && user.emailVerified) {
  if (user) {
    next()
  } else {
    userStore.logoutUser()
    next('/login')
  }
  userStore.loadingSesion = false
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue'),
    beforeEnter: requireAuth,
  },
]

const router = createRouter({ routes, history: createWebHistory() })

export default router
