import * as type from '../mutation-types'
import {getCategoryMenuData, getCategoryShowData, getGoodsDetailsData, getGoodsSpecData} from '../../../api/goods/'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		categoryMenu: [],
		categoryShow: [],
		goodsDetails: {},
		goodsSpec: []
	},
	getters: {

	},
	mutations: {
		[type.SET_CATEGORYMENU](state, payload) {
			payload.categoryMenu.forEach((item, index) => {
				item.active = false
			})
			state.categoryMenu = payload.categoryMenu
		},
		[type.UPDATE_CATEGORYMENU_SELECT](state, payload) {
			for(let i = 0; i < state.categoryMenu.length; i++) {
				let item = state.categoryMenu[i]
				if(item.active) {
					if(payload.index !== i) {
						item.active = false
						state.categoryMenu[payload.index].active = true
					} else {
						item.active = false
					}
					// Vue.set(state.categoryMenu, payload.index, state.categoryMenu[payload.index])
					return
				}
			}
			state.categoryMenu[payload.index].active = true
			// Vue.set(state.categoryMenu, payload.index, state.categoryMenu[payload.index])
		},
		[type.SET_CATEGORYSHOW](state, payload) {
			state.categoryShow = payload.categoryShow
		},
		[type.SET_GOODSDETAILS](state, payload) {
			state.goodsDetails = payload.goodsDetails
		},
		[type.SET_GOODSSPEC](state, payload) {
			state.goodsSpec = payload.goodsSpec
		}
	},
	actions: {
		getCategoryMenu(context, payload) {
			getCategoryMenuData().then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_CATEGORYMENU, {categoryMenu: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		},
		getCategoryShow(context, payload) {
			getCategoryShowData(payload.cid).then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_CATEGORYSHOW, {categoryShow: res.data})
					if(payload.success) {
						payload.success()
					}
				} else {
					context.commit(type.SET_CATEGORYSHOW, {categoryShow: []})
					if(payload.success) {
						payload.success()
					}
				}
			}).catch((errror) => {
				console.log(errror)
			})
		},
		getGoodsDetails(context, payload) {
			getGoodsDetailsData(payload.gid).then((res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_GOODSDETAILS, {goodsDetails: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}))
		},
		getGoodsSpec(context, payload) {
			getGoodsSpecData(payload.gid).then((res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_GOODSSPEC, {goodsSpec: res.data})
					if(payload.success) {
						payload.success()
					}
				}
			}))
		}
	}
}