import * as type from '../mutation-types'
import {getAddressAllData} from '../../../api/address/'

export default {
	namespaced: true,
	state: {
		addressAll: []
	},
	getters: {

	},
	mutations: {
		[type.SET_ADDRESSALL](state, payload) {
			state.addressAll = payload.addressAll
		}
	},
	actions: {
		getAddressAll(context, payload) {
			getAddressAllData(payload.data).then(res => {
				console.log(res)
				if(res.code === 200) {
					context.commit(type.SET_ADDRESSALL, {addressAll: res.data})
				}
			})
		}
	}
}