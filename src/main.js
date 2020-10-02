import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import ElementUi from 'element-ui'
import { get, post } from './lib/network'
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie
Vue.prototype.$get = get
Vue.prototype.$post = post
// Vue.use(ElementUi)
Vue.config.productionTip = false
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
if (!!window.ActiveXObject || 'ActiveXObject' in window) {
  window.location.href = 'notsupport.html'
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
