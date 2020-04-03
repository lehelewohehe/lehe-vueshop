import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import conf from './assets/js/conf/config.js'
import utils from './assets/js/utils'
// import FastClick from 'fastclick'

// FastClick.attach(document.body)

Vue.prototype.$config = conf
Vue.prototype.$utils = utils
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
