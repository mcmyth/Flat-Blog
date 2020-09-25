import axios from 'axios'

// 1.Create axios instance
const instance = axios.create({
  baseURL: 'http://127.0.0.1/',
  timeout: 5000
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

export function get(options) {
  return new Promise((resolve, reject) => {
    instance.get(options.url, options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

export function post(options) {
  return new Promise((resolve, reject) => {
    instance.post(options.url, options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}
