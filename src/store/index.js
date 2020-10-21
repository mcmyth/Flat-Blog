import Vue from 'vue'
import Vuex from 'vuex'
import { BlogConfig } from '@/config/blog.config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
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
    setLoadStatus(state, status) {
      state.loaded = status
    },
    getProfile(state) {
      if (state.token !== '' && state.profile.s === null) {
        this.dispatch('updateProfile')
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
    updateProfile(state, profile) {
      state.profile.s = 'ok'
      state.profile = profile
    }
  },
  getters: {
  },
  actions: {
    async updateProfile(context) {
      const profile = await Vue.prototype.$get(context.state.apiURL + 'user/profile', {
        headers: { Authorization: context.state.token }
      })
      this.commit('updateProfile', profile)
    }
  },
  modules: {
  }
})
