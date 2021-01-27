import axios from 'axios'
import store from '@/store'
import { BlogConfig } from '@/config/blog.config'
import { decodeJwt } from '@/lib/Utils.js'
import Vue from 'vue'
// 1.Create axios instance
const instance = axios.create({
  baseURL: BlogConfig.apiURL,
  timeout: 50000,
  withCredentials: true
})

// Response interceptors
instance.interceptors.response.use(config => {
  store.commit('setLoadingStatus', false)
  store.commit('setLoadStatus', true)
  return config.data
}, error => {
  console.log(error)
  Vue.prototype.$noty.error('加载失败,请稍后再试', {
    killer: true
  })
  store.commit('setLoadingStatus', false)
})

// Request interceptors
instance.interceptors.request.use(config => {
  store.commit('setLoadStatus', false)
  store.commit('setLoadingStatus', true)
  const token = localStorage.getItem('accessToken')
  if (token) {
    if (token === 'undefined' || token === null) {
      // token无效或过期后移除登录状态
      localStorage.removeItem('accessToken')
      store.commit('setToken', '')
      store.commit('updateLoginState')
      store.commit('defaultProfile')
    } else {
      store.commit('setToken', token)
      config.headers.common.Authorization = store.state.token
    }
    const jwt = decodeJwt(token)
    const timestamp = Number(Date.parse(new Date()).toString().substr(0, 10))
    if (timestamp > jwt.exp - 3600) {
      // Will expire soon
      getNewToken().then((res) => {
        if (res.token !== undefined) {
          localStorage.setItem('accessToken', res.token)
        }
      })
    }
  }
  return config
})
function getNewToken() {
  return new Promise((resolve, reject) => {
    axios.create({
      baseURL: BlogConfig.apiURL,
      timeout: 50000,
      withCredentials: true
    }).get('/user/token', {
      headers: {
        Authorization: store.state.token
      }
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function get(url, options) {
  return new Promise((resolve, reject) => {
    instance.get(url, options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

export function post(url, data, options) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}
