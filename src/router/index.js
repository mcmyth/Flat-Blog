import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home'
import { BlogConfig } from '@/config/blog.config'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    meta: {
      title: '登录'
    },
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
    name: 'DefaultProfile',
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
    meta: {
      title: '账户验证'
    },
    path: '/verification',
    name: 'Verification',
    component: () => import('../views/Verification')
  },
  {
    meta: {
      title: '更改密码'
    },
    path: '/pwd',
    name: 'Password',
    component: () => import('../views/Password')
  },
  {
    meta: {
      title: '更改邮箱'
    },
    path: '/email',
    name: 'Email',
    component: () => import('../views/Email')
  },
  {
    meta: {
      title: '完善资料'
    },
    path: '/setup',
    name: 'Setup',
    component: () => import('../views/Setup')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/Error404'),
    meta: {
      title: '404 NOT FOUND'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${BlogConfig.blogName}`
  }
  document.documentElement.scrollTop = 0
  const token = localStorage.getItem('accessToken')
  if (token !== null && token !== 'undefined') {
    store.commit('setToken', token)
    store.commit('getProfile')
  } else {
    store.commit('defaultProfile', token)
  }
  next()
})

export default router
