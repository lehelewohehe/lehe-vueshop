import * as type from '../mutation-types'
import {getNavData, getProductData, getSwiperData, getRecommendData} from '../../../api/index/'

export default {
	namespaced: true,
	state: {
		swipers: [],
		navs: [],
		products: [],
		recommend: []
	},
	getters: {

	},
	mutations: {
		[type.SET_SWIPERS](state, payload) {
			state.swipers = payload.swipers
		},
		[type.SET_NAVS](state, payload) {
			state.navs = payload.navs
		},
		[type.SET_PRODUCTS](state, payload) {
			state.products = payload.products
		},
		[type.SET_RECOMMEND](state, payload) {
			state.recommend = payload.recommend
		}	
	},
	actions: {
		getNav(context, payload) {
			getNavData().then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_NAVS, {navs: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		},
		getSwiper(context, payload) {
			getSwiperData().then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_SWIPERS, {swipers: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		},
		getProduct(context, payload) {
			getProductData().then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_PRODUCTS, {products: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		},
		getRecommend(context, payload) {
			getRecommendData().then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_RECOMMEND, {recommend: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		}
	}
}