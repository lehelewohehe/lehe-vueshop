import * as type from '../mutation-types'
import { getOrderAllData, getOrderReviewData, getOrderDetailsData, getCommentItemData, uploadCommentData, cancelOrderData, confirmGetterData } from '../../../api/order/'

export default {
    namespaced: true,
    state: {
        orderAll: {},
        orderReview: {},
        orderDetails: {},
        commentItem: []
    },
    getters: {

    },
    mutations: {
        [type.SET_ORDERALL](state, payload) {
            state.orderAll = payload.orderAll
        },
        [type.APPEND_ORDERALL](state, payload) {
            state.orderAll.data = state.orderAll.data.concat(payload.orderAll.data)
            state.orderAll.pageinfo = payload.orderAll.pageinfo
        },
        [type.SET_ORDERREVIEW](state, payload) {
            state.orderReview = payload.orderReview
        },
        [type.APPEND_ORDERREVIEW](state, payload) {
            state.orderReview.data = state.orderReview.data.concat(payload.orderReview.data)
            state.orderReview.pageinfo = payload.orderReview.pageinfo
        },
        [type.SET_ORDERDETAILS](state, payload) {
            state.orderDetails = payload.orderDetails
        },
        [type.SET_COMMENTITEM](state, payload) {
            state.commentItem = payload.commentItem
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
        },
        getOrderDetails(context, payload) {
            getOrderDetailsData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.SET_ORDERDETAILS, { orderDetails: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        getCommentItem(context, payload) {
            getCommentItemData().then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.SET_COMMENTITEM, { commentItem: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        uploadComment(context, payload) {
            uploadCommentData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success(res.data)
                    }
                } else {
                    if (payload.error) {
                        payload.error(res.data)
                    }
                }
            })
        },
        cancelOrder(context, payload) {
            cancelOrderData(payload.data).then(res => {
                console.log(res)
                if(payload.success) {
                    payload.success(res.data)
                }
            })
        },
        confirmGetter(context, payload) {
            confirmGetterData(payload.data).then(res => {
                console.log(res)
                if(payload.success) {
                    payload.success(res.data)
                }
            })
        }
    }
}