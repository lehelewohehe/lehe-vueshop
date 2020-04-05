import * as type from '../mutation-types'
import { getOrderAllData, getOrderReviewData } from '../../../api/order/'

export default {
    namespaced: true,
    state: {
        orderAll: {},
        orderReview: {}
    },
    getters: {

    },
    mutations: {
        [type.SET_ORDERALL](status, payload) {
            status.orderAll = payload.orderAll
        },
        [type.APPEND_ORDERALL](status, payload) {
            status.orderAll.data = status.orderAll.data.concat(payload.orderAll.data)
            status.orderAll.pageinfo = payload.orderAll.pageinfo
        },
        [type.SET_ORDERREVIEW](status, payload) {
            status.orderReview = payload.orderReview
        },
        [type.APPEND_ORDERREVIEW](status, payload) {
            status.orderReview.data = status.orderReview.data.concat(payload.orderReview.data)
            status.orderReview.pageinfo = payload.orderReview.pageinfo
        }
    },
    actions: {
        getOrderAll(context, payload) {
            getOrderAllData(payload.data).then(res => {
                let page = payload.data.page ? payload.data.page : 1
                console.log(res)
                if (page === 1) {
                    if (res.code === 200) {
                        context.commit(type.SET_ORDERALL, { orderAll: res })
                        if (payload.success) {
                            payload.success()
                        }
                    } else {
                        context.commit(type.SET_ORDERALL, { orderAll: {} })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                } else {
                    if (res.code === 200) {
                        context.commit(type.APPEND_ORDERALL, { orderAll: res })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                }
            })
        },
        getOrderReview(context, payload) {
            getOrderReviewData(payload.data).then(res => {
                let page = payload.data.page ? payload.data.page : 1
                console.log(res)
                if (page === 1) {
                    if (res.code === 200) {
                        context.commit(type.SET_ORDERREVIEW, { orderReview: res })
                        if (payload.success) {
                            payload.success()
                        }
                    } else {
                        context.commit(type.SET_ORDERREVIEW, { orderReview: {} })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                } else {
                    if (res.code === 200) {
                        context.commit(type.APPEND_ORDERREVIEW, { orderReview: res })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                }
            })
        }
    }
}