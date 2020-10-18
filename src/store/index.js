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
    profile: {
      s: null
    },
    isLoading: false
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
      if (state.token !== '' && state.profile.s === null) {
        this.commit('updateProfile')
      }
    },
    defaultProfile(state) {
      state.profile.username = '未登录'
      state.profile.avatar_img = '/assets/default-avatar.svg'
      state.profile.banner_img = '/assets/default-banner.jpg'
    },
    setLoadingStatus (state, isLoading) {
      state.isLoading = isLoading
    },
    updateProfileImg(state, options) {
      if (options.type === 'banner_img') state.profile.banner_img = options.link
      if (options.type === 'avatar_img') state.profile.avatar_img = options.link
    },
    updateProfile(state) {
      state.profile.s = 'ok'
      Vue.prototype.$get(state.apiURL + 'user/profile', {
        headers: { Authorization: state.token }
      }).then(res => {
        state.profile = res
      })
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
