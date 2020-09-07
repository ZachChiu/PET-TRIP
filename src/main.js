import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
window.$ = $
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
