import Vue from 'vue'
import Vuex from 'vuex'
import { BlogConfig } from '@/config/blog.config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogName: BlogConfig.blogName,
    apiURL: BlogConfig.apiURL,
    isLogin: false,
    token: ''
  },
  mutations: {
    updateLoginState(state) {
      const token = localStorage.getItem('accessToken')
      state.isLogin = (token !== null)
    },
    set_token(state, token) {
      state.token = token
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
