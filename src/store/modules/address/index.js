import * as type from '../mutation-types'
import { getAddressAllData, addAddressOneData, getAddressOneData, modAddressOneData, delAddressOneData } from '../../../api/address/'

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
                if (res.code === 200) {
                    context.commit(type.SET_ADDRESSALL, { addressAll: res.data })
                }
            })
        },
        addAddressOne(context, payload) {
            addAddressOneData(payload.data).then(res => {
                console.log(res)
                if (payload.success) {
                    payload.success()
                }
            })
        },
        getAddressOne(context, payload) {
            getAddressOneData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success(res.data)
                    }
                }
            })
        },
        modAddressOne(context, payload) {
            modAddressOneData(payload.data).then(res => {
                console.log(res)
                if (payload.success) {
                    payload.success(res.data)
                }
            })
        },
        delAddressOne(context, payload) {
            delAddressOneData(payload.data).then(res => {
                console.log(res)
                if (payload.success) {
                    payload.success(res.data)
                }
            })
        }
    }
}