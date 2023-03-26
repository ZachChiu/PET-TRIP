import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as filters from './assets/filters';
import jQuery from 'jquery';
import axios from 'axios';
import VueAxios from 'vue-axios';
import StarRating from 'vue-star-rating';
import VCalendar from 'v-calendar';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import * as rules from 'vee-validate/dist/rules';
import {required, email} from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import {VueSpinners} from '@saeris/vue-spinners';
import animated from 'animate.css';
import 'bootstrap';
localize('zh_TW', zhTW);

axios.defaults.baseURL = '/api';

Vue.config.productionTip = false;
Vue.use(VueSpinners);
Vue.use(VueAxios, axios);
Vue.use(animated);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

window.$ = window.jQuery = jQuery;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

extend('secret', {
  validate: (value) => value === 'example',
  message: 'This is not the magic word',
});
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
  });
});
extend('required', {
  ...required,
  message: '此為必填',
});
extend('email', {
  ...email,
  message: '信箱格式錯誤',
});
extend('password', {
  params: ['target'],
  validate(value, {target}) {
    return value === target;
  },
  message: '密碼不相同',
});

configure({
  classes: {
    // valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.prototype.Swal = Swal;

Vue.component('star-rating', StarRating);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
