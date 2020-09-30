import axios from 'axios'
import { BlogConfig } from '@/config/blog.config'
// 1.Create axios instance
const instance = axios.create({
  baseURL: BlogConfig.apiURL,
  timeout: 50000,
  withCredentials: true
})

// Response interceptors
instance.interceptors.response.use(res => {
  console.log('Response拦截器')
  return res.data
})

// Request interceptors
instance.interceptors.request.use(res => {
  console.log('Request拦截器')
  return res
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

export function post(url, options) {
  return new Promise((resolve, reject) => {
    instance.post(url, options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}
