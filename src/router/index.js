import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/Post')
  },
  {
    path: '/postedit/:id',
    name: 'PostEdit',
    component: () => import('../views/PostEdit')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/Error404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')
  if (token !== null) {
    store.commit('setToken', token)
    store.commit('getProfile')
  } else {
    store.commit('defaultProfile', token)
  }
  next()
})

export default router
