import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index/'
import goods from './modules/goods/'
import review from './modules/goods/review'
import search from './modules/search/'
import user from './modules/user/'
import address from './modules/address/'
import order from './modules/order/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	index,
  	goods,
  	review,
  	search,
  	user,
  	address,
  	order
  }
})
