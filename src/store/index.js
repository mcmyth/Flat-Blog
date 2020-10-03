import Vue from 'vue'
import Vuex from 'vuex'
import { BlogConfig } from '@/config/blog.config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogName: BlogConfig.blogName,
    apiURL: BlogConfig.apiURL,
    isLogin: false,
    token: '',
    profile: null
  },
  mutations: {
    updateLoginState(state) {
      const token = localStorage.getItem('accessToken')
      state.isLogin = (token !== null)
    },
    setToken(state, token) {
      state.token = token
    },
    getProfile(state) {
      if (state.token !== '' && state.profile == null) {
        Vue.prototype.$get(state.apiURL + 'user/profile', {
          headers: { Authorization: state.token }
        }).then(res => {
          state.profile = res
        })
      }
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
