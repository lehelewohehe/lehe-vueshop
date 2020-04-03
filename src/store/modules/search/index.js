import * as type from '../mutation-types'
import { getHotwordsData, getSearchParamsData, getSearchResultData } from '../../../api/search/'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        hotwords: [],
        latelywords: localStorage['latelywords'] ? JSON.parse(localStorage['latelywords']) : [],
        searchParams: [],
        searchResult: [],
        pageInfo: {}
    },
    getters: {

    },
    mutations: {
        [type.ADD_LATELYWORDS](state, payload) {
            let latelywords = localStorage['latelywords'] || '[]'
            latelywords = JSON.parse(latelywords)
            let flag = latelywords.findIndex((item, index) => {
                return item.name == payload.name
            })
            if (flag !== -1) {
                latelywords.splice(flag, 1)
            }
            latelywords.unshift(payload)
            localStorage.setItem('latelywords', JSON.stringify(latelywords))
            state.latelywords = latelywords
        },
        [type.DEL_LATELYWORDS](state, payload) {
            let latelywords = localStorage['latelywords'] || '[]'
            latelywords = JSON.parse(latelywords)
            if (payload.index === -1) {
                latelywords = []
            } else {
                latelywords.splice(payload.index, 1)
            }
            localStorage.setItem('latelywords', JSON.stringify(latelywords))
            state.latelywords = latelywords
        },
        [type.SET_HOTWORDS](state, payload) {
            state.hotwords = payload.hotwords
        },
        [type.SET_SEARCHPARAMS](state, payload) {
            payload.searchParams.forEach((item, index) => {
                item.isHide = false
                item.param.forEach((subItem, subIndex) => {
                    subItem.active = false
                })
            })
            state.searchParams = payload.searchParams
        },
        [type.UPDATE_SEARCHPARAMS_ISHIDE](state, payload) {
            state.searchParams[payload.index].isHide = !state.searchParams[payload.index].isHide
        },
        [type.UPDATE_SEARCHPARAMS_MULTIPLESELECT](state, payload) {
            for(let i = 0; i < state.searchParams[payload.index].param.length; i++) {
                let item = state.searchParams[payload.index].param[i]
                if(item.active && payload.subIndex === i) {
                    item.active = false
                    return
                }
            }
            state.searchParams[payload.index].param[payload.subIndex].active = true
        },
        [type.CANCEL_ALL_SEARCHPARAMS_SELECT](state, payload) {
            for(let i = 0; i < state.searchParams.length; i++) {
                for(let j = 0; j < state.searchParams[i].param.length; j++) {
                    let item = state.searchParams[i].param[j]
                    item.active = false
                }
            }
        },
        [type.SET_SERACHRESULT](state, payload) {
            state.searchResult = payload.searchResult
        },
        [type.APPEND_SERACHRESULT](state, payload) {
            state.searchResult = state.searchResult.concat(payload.searchResult)
            console.log(state.searchResult)
        },
        [type.SET_PAGEINFO](state, payload) {
            state.pageInfo = payload.pageInfo
        }
    },
    actions: {
        getHotwords(context, payload) {
            getHotwordsData().then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.SET_HOTWORDS, { hotwords: res.data })
                }
            }).catch((errror) => {
                console.log(errror)
            })
        },
        getSearchParams(context, payload) {
            getSearchParamsData(payload.key).then(res => {
                console.log(res)
                if(res.code === 200) {
                    context.commit(type.SET_SEARCHPARAMS, {searchParams: res.data})
                    if(payload.success) {
                        payload.success()
                    }
                } else {
                    context.commit(type.SET_SEARCHPARAMS, {searchParams: []})
                    if(payload.success) {
                        payload.success()
                    }
                }
            }).catch((errror) => {
                console.log(errror)
            })
        },
        getSearchResult(context, payload) {
            getSearchResultData(payload.data).then(res => {
                console.log(res)
                payload.data.page = (payload.data.page === undefined ? 1 : payload.data.page)
                if(payload.data.page === 1) {
                    if(res.code === 200) {
                        context.commit(type.SET_SERACHRESULT, {searchResult: res.data})
                        context.commit(type.SET_PAGEINFO, {pageInfo: res.pageinfo})
                    } else {
                        context.commit(type.SET_SERACHRESULT, {searchResult: []})
                        context.commit(type.SET_PAGEINFO, {pageInfo: {total: 0, pagenum: 1, page: 1}})
                    }
                } else {
                    if(res.code === 200) {
                        context.commit(type.APPEND_SERACHRESULT, {searchResult: res.data})
                        context.commit(type.SET_PAGEINFO, {pageInfo: res.pageinfo})
                    } else {
                        context.commit(type.APPEND_SERACHRESULT, {searchResult: []})
                        context.commit(type.SET_PAGEINFO, {pageInfo: {total: 0, pagenum: 1, page: 1}})
                    }
                }
            })
        }
    }
}