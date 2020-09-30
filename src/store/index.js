import Vue from 'vue'
import Vuex from 'vuex'
import { BlogConfig } from '@/config/blog.config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogName: BlogConfig.blogName,
    apiURL: BlogConfig.apiURL
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
