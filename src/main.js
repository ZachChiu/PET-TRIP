import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCalendar from 'v-calendar'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { required, email } from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import 'bootstrap'
localize('zh_TW', zhTW)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

window.$ = $
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
})
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule]
  })
})
extend('required', {
  ...required,
  message: '此為必填'
})
extend('email', {
  ...email,
  message: '信箱格式錯誤'
})
extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: '密碼不相同'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
