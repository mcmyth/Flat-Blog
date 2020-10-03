import axios from 'axios'
import store from '@/store'
import { BlogConfig } from '@/config/blog.config'
// 1.Create axios instance
const instance = axios.create({
  baseURL: BlogConfig.apiURL,
  timeout: 50000,
  withCredentials: true
})

// Response interceptors
instance.interceptors.response.use(config => {
  console.log('Response拦截器')
  return config.data
})

// Request interceptors
instance.interceptors.request.use(config => {
  console.log('Request拦截器')
  if (localStorage.getItem('accessToken')) {
    store.commit('set_token', localStorage.getItem('accessToken'))
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
export function _get(url, options, callback) {
  return new Promise((resolve, reject) => {
    instance.get(url, options)
      .then(res => {
        callback(res)
      }).catch(err => {
        callback(err)
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
