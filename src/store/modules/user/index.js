import * as type from '../mutation-types'
import { loginData, safeExitData, getUserInfoData, isSafeLoginData, uploadAvatarData, updateUserInfoData, modPasswordData, getMyFavoriteData, deleteMyFavoriteData, addMyFavoriteData, updateCellPhoneData } from '../../../api/user/'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        loginInfo: localStorage['loginInfo'] ? JSON.parse(localStorage['loginInfo']) : {},
        isLogin: localStorage['isLogin'] ? JSON.parse(localStorage['isLogin']) : false,
        userInfo: localStorage['userInfo'] ? JSON.parse(localStorage['userInfo']) : {},
        avatarInfo: {},
        myFavorite: {}
    },
    getters: {

    },
    mutations: {
        [type.SET_LOGININFO](state, payload) {
            localStorage['loginInfo'] = JSON.stringify(payload.loginInfo)
            localStorage['isLogin'] = JSON.stringify(true)
            state.loginInfo = payload.loginInfo
            state.isLogin = true
        },
        [type.CLEAR_LOGININFO](state, payload) {
            localStorage.removeItem('loginInfo')
            localStorage.removeItem('isLogin')
            localStorage.removeItem('userInfo')
            state.loginInfo = {}
            state.userInfo = {}
            state.isLogin = false
        },
        [type.SET_USERINFO](state, payload) {
            localStorage['userInfo'] = JSON.stringify(payload.userInfo)
            state.userInfo = payload.userInfo
        },
        [type.SET_AVATARINFO](state, payload) {
            state.avatarInfo = payload.avatarInfo
        },
        [type.SET_MYFAVORITE](state, payload) {
            state.myFavorite = payload.myFavorite
        },
        [type.APPEND_MYFAVORITE](state, payload) {
            state.myFavorite.data = state.myFavorite.data.concat(payload.myFavorite.data)
            state.myFavorite.pageinfo = payload.myFavorite.pageinfo
        },
        [type.DELETE_MYFAVORITE](state, payload) {
            let index = state.myFavorite.data.findIndex((item, index) => {
                return item.fid === payload.fid
            })
            if (index !== -1) {
                console.log(index)
                state.myFavorite.data.splice(index, 1)
            }
        }
    },
    actions: {
        login(context, payload) {
            loginData(payload.data).then(res => {
                console.log(res)
                console.log(context)
                if (res.code === 200) {
                    context.commit(type.SET_LOGININFO, { loginInfo: res.data })
                    context.dispatch('getUserInfo', { data: { uid: context.state.loginInfo.uid } })
                    if (payload.success) {
                        payload.success()
                    }
                } else {
                    if (payload.error) {
                        payload.error()
                    }
                }
            })
        },
        isSafeLogin(context, payload) {
            isSafeLoginData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success()
                    }
                } else {
                    context.commit(type.CLEAR_LOGININFO)
                    if (payload.error) {
                        payload.error()
                    }
                }
            })
        },
        safeExit(context, payload) {
            safeExitData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.CLEAR_LOGININFO)
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        getUserInfo(context, payload) {
            getUserInfoData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.SET_USERINFO, { userInfo: res.data })
                }
            })
        },
        uploadAvatar(context, payload) {
            uploadAvatarData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.SET_AVATARINFO, { avatarInfo: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        updateUserInfo(context, payload) {
            updateUserInfoData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        modPassword(context, payload) {
            modPasswordData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        getMyFavorite(context, payload) {
            getMyFavoriteData(payload.data).then(res => {
                let page = payload.data ? payload.data.page : 1
                console.log(res)
                if (page === 1) {
                    if (res.code === 200) {
                        context.commit(type.SET_MYFAVORITE, { myFavorite: res })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                } else {
                    if (res.code === 200) {
                        context.commit(type.APPEND_MYFAVORITE, { myFavorite: res })
                        if (payload.success) {
                            payload.success()
                        }
                    }
                }
            })
        },
        deleteMyFavorite(context, payload) {
            deleteMyFavoriteData(payload.data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    context.commit(type.DELETE_MYFAVORITE, { fid: payload.data.fid })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        addMyFavorite(context, payload) {
            addMyFavoriteData(payload.data).then(res => {
                console.log(res)
                if (payload.success) {
                    payload.success(res.data)
                }
            })
        },
        updateCellPhone(context, payload) {
            updateCellPhoneData(payload.data).then(res => {
                console.log(res)
                if (payload.success) {
                    payload.success(res.data)
                }
            })
        }
    }
}