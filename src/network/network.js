import axios from 'axios'
import store from '@/store'
import { BlogConfig } from '@/config/blog.config'
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
  if (localStorage.getItem('accessToken')) {
    store.commit('setToken', localStorage.getItem('accessToken'))
    config.headers.common.Authorization = store.state.token
  }
  return config
})

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
