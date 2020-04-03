import * as type from '../mutation-types'
import { getGoodsCommentData } from '../../../api/goods/review'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        goodsComment: [],
        pageInfo: {}
    },
    getters: {

    },
    mutations: {
        [type.SET_GOODSCOMMENT](state, payload) {
            state.goodsComment = payload.goodsComment
        },
        [type.SET_PAGEINFO](state, payload) {
            state.pageInfo = payload.pageInfo
        },
        [type.APPEND_GOODSCOMMENT](state, payload) {
            state.goodsComment = state.goodsComment.concat(payload.goodsComment)
        }
    },
    actions: {
        getGoodsComment(context, payload) {
            getGoodsCommentData(payload).then((res) => {
                console.log(res)
                let page = payload.page ? payload.page : 1
                if (page === 1) {
                    if (res.code === 200) {
                        context.commit(type.SET_GOODSCOMMENT, { goodsComment: res.data })
                        context.commit(type.SET_PAGEINFO, { pageInfo: res.pageinfo })
                    } else {
                        context.commit(type.SET_GOODSCOMMENT, { goodsComment: [] })
                        context.commit(type.SET_PAGEINFO, { pageInfo: { pagesize: "8", page: "1", pagenum: "1", total: 0 } })
                    }
                } else {
                	if(res.code === 200) {
                		context.commit(type.APPEND_GOODSCOMMENT, { goodsComment: res.data })
                        context.commit(type.SET_PAGEINFO, { pageInfo: res.pageinfo })
                	} else {
                		context.commit(type.APPEND_GOODSCOMMENT, { goodsComment: [] })
                        context.commit(type.SET_PAGEINFO, { pageInfo: { pagesize: "8", page: "1", pagenum: "1", total: 0 } })
                	}
                }
                if (payload.success) {
                    payload.success()
                }
            })
        }
    }
}