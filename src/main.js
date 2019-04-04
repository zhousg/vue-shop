// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import moment from 'moment'
import editor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(editor)

Nprogress.configure({showSpinner: false})

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = sessionStorage.getItem('token')
  Nprogress.start()
  return config
})
axios.interceptors.response.use((res) => {
  Nprogress.done()
  if (res.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return res
  }
}, (err) => Promise.reject(err))
Vue.prototype.$http = axios

Vue.filter('formatTime', (value) => {
  return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
