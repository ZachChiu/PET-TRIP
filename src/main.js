import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ValidationProvider, extend } from 'vee-validate'

import 'bootstrap'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
window.$ = $
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
})

Vue.component('ValidationProvider', ValidationProvider)
