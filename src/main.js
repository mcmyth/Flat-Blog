import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import xss from 'xss'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import ElementUi from 'element-ui'
import { get, post } from './network/network'
import cookie from 'vue-cookie'
// import 'viewerjs/dist/viewer.min.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Vue.prototype.xss = xss
Vue.prototype.$cookie = cookie
Vue.prototype.$get = get
Vue.prototype.$post = post
// Vue.use(ElementUi)
Vue.config.productionTip = false
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueNoty, {
  timeout: 3000,
  progressBar: true,
  layout: 'topRight'
})
if (!!window.ActiveXObject || 'ActiveXObject' in window) {
  window.location.href = 'notsupport.html'
} else {
  new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
      // document.dispatchEvent(new Event('render-event'))
    }
  }).$mount('#app')
}
